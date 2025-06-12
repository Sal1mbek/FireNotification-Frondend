<template>
    <div style="font-family: 'Inter', sans-serif" class="h-full w-full bg-white flex flex-col pl-[52px] lg:pl-[72px] md:pr-[52px] pt-10">
        <div class="flex md:px-5 px-2">
            <div class="text-center mb-8 flex justify-between">
                <h1 class="text-3xl font-bold text-gray-800">Create Report</h1>
            </div>
        </div>
        <div class="md:px-5 px-2">
            <div>
                <form @submit.prevent="submitReport">
                    <div class="mb-4">
                        <div class="block text-gray-700 text-md font-bold mb-2">Upload photo</div>
                        <label for="uploadFile" class="w-full h-32 bg-gray-100 border-gray-300 rounded-lg border-2 border-dashed flex items-center justify-center mb-2 cursor-pointer">
                            <img v-if="photoBase64" :src="'data:image/jpeg;base64,' + photoBase64" class="w-full h-full object-cover rounded-lg" alt="Uploaded Photo" />
                            <div v-else class="flex flex-col items-center gap-2 justify-center text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                </svg>
                                <span class="text-gray-500">Upload your file here</span>
                            </div>
                            <input id="uploadFile" class="hidden" placeholder='Upload' type="file" @change="handleFileUpload" accept="image/*" />
                        </label>
                    </div>
                    <div class="mb-4">
                        <p class="block text-gray-700 text-md font-bold mb-2">Where did this happen? Please upload your location.</p>
                        <MapForFire :height="'200px'" :scale="15" :fireCoordinate="[reportData.location.latitude, reportData.location.longitude]" :data="[[reportData.location]]" v-if="reportData.location" />
                        <button type="button" class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                         @click.preven="sendLocation">Send location</button>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-md font-bold mb-2" for="description">Description</label>
                        <textarea required v-model="reportData.description" id="description" placeholder="Enter report description"
                                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                    </div>
                    <div class="flex items-center justify-end">
                        <button type="submit"
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Submit Report
                        </button>
                    </div>
                </form>
            </div>
            <p v-if="errorMessage" class="text-red-500 text-md mb-4">{{ errorMessage }}</p>
            <p v-if="successMessage" class="text-green-500 text-md mb-4">{{ successMessage }}</p>
        </div>
        
    </div>
</template>
<script>
import MapForFire from '@/components/Dashboard/MapForFire.vue';
import { createReport } from '@/services/fireService';
export default {
    name: 'CreateReport',
    components: {
        MapForFire
    },
    data() {
        return {
            reportData: {
                description: '',
                location: null,
            },
            photoBase64: null,
            errorMessage: '',
            successMessage: ''
        };
    },
    methods: {
        async submitReport() {
            try {
                if(this.reportData.location === null) {
                    this.errorMessage = 'Please send your location before submitting the report.';
                    return;
                }
                if(!this.photoBase64) {
                    this.errorMessage = 'Please upload a photo before submitting the report.';
                    return;
                }
                await createReport({
                    userId: localStorage.getItem('userId'),
                    definition: this.reportData.description,
                    latitude: this.reportData.location.latitude,
                    longitude: this.reportData.location.longitude,
                    photoBase64: this.photoBase64
                });
                this.successMessage = 'Report submitted successfully!';
                this.errorMessage = '';
            } catch (error) {
                this.errorMessage = 'Failed to submit report. Please try again.';
            }
        },
        sendLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.reportData.location = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                }, (error) => {
                    this.errorMessage = 'Unable to retrieve location. Please enable location services.';
                });
            } else {
                this.errorMessage = 'Geolocation is not supported by this browser.';
            }
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                const base64WithPrefix = reader.result; // e.g. "data:image/jpeg;base64,..."
                
                // Remove the prefix
                const base64Data = base64WithPrefix.split(',')[1];

                this.photoBase64 = base64Data;
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        }
    }
};
</script>
