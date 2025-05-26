<template>
    <div style="{font-family: 'Inter', sans-serif}" class="h-full w-full bg-white flex flex-col pl-[52px] md:pr-[52px] pt-10">
        <div class="container mx-auto md:px-5 px-2">
            <div class="text-center mb-8 flex justify-between">
                <h1 class="text-3xl font-bold text-gray-800">Create Report</h1>
            </div>
        </div>
        <div class="md:px-5 px-2">
            <div>
                <form @submit.prevent="submitReport">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-md font-bold mb-2" for="location">Location</label>
                        <div class="flex flex-col gap-1 mb-2">
                            <span class="text-gray-600">Latitude: {{ reportData.location ? reportData.location.latitude : 'Not set' }}</span>
                            <span class="text-gray-600">Longitude: {{ reportData.location ? reportData.location.longitude : 'Not set' }}</span>
                        </div>
                        <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                         @click.preven="sendLocation">Send location</button>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-md font-bold mb-2" for="location">Upload photo</label>
                        <input placeholder='Upload' type="file" @change="handleFileUpload" accept="image/*" />
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-md font-bold mb-2" for="description">Description</label>
                        <textarea required v-model="reportData.description" id="description" placeholder="Enter report description"
                                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                    </div>
                    <div class="flex items-center justify-end">
                        <button type="submit"
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
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
import { createReport } from '@/services/fireService';
export default {
    name: 'CreateReport',
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
