<template>
    <div class="h-full w-full bg-white pl-[52px] lg:pl-[72px] md:pr-[52px] pt-12">
        <div class="md:flex pb-5 md:pl-[35px] gap-10 px-[15px] grid-flow-row-dense">
                    <div class="flex justify-center items-end">
                        <img class="rounded-full w-44 h-44 object-cover" src="../../assets/profile.png" />
                        <!-- <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg> -->
                    <!-- <p class="text-sm text-center flex items-center gap-1">Upload photo
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                        </svg>
                    </p> -->
                    </div>
            <div class=" justify-center flex flex-col md:w-[400px] lg:w-[500px] gap-2">
                <p class="justify-start items-center flex text-3xl">{{ userData.username }}</p>
                <ul class="text-gray-500 justify-center flex flex-col gap-2">
                    <li class="flex justify-between">
                        <div>Email</div>
                        <div class="text-black">{{ userData.email }}</div>
                    </li>
                    <li class="flex justify-between">
                        <div>Phone number</div>
                        <div class="text-black">{{ userData.phoneNumber }}</div>
                    </li>
                    <li class="flex justify-between">
                        <div>Created at</div>
                        <div class="text-black">{{  new Date(userData.createdAt).toLocaleString() }}</div>
                    </li>
            </ul>
            </div>
        </div>
        <div class="flex flex-col justify-center">
            <div v-for="fire in fireData" class="flex justify-center">
                <div class="justify-center mb-4 p-4 border rounded-lg shadow-md">
                    <img
                        :src="`data:image/jpeg;base64,${fire.photo}`"
                        alt="Base64 Photo"
                        class=" object-cover h-[300px]"
                        />
                    <p><strong>Address:</strong> {{ fire.address }}</p>
                    <p><strong>Time of Fire:</strong> {{ new Date(fire.time_fire).toLocaleString() }}</p>
                    <p><strong>Description:</strong> {{ fire.definition }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getUserFireData } from "@/services/crowdDataService";
import { getProfile } from "@/services/authService";
export default {
    name: 'Profile',
    data() {
        return {
            fireData: [],
            userData: {
                username: '',
                email: '',
                phoneNumber: '',
                photo: null,
                roles: '', 
                createdAt: '',
            },
        }
    },
    mounted () {
        getProfile().then((response) => {
            this.userData = response;
        }).catch((error) => {
            console.error("Error fetching user profile:", error);
        });
        getUserFireData(localStorage.getItem('userId')).then((response) => {
            this.fireData = response;
            console.log("User fire data fetched successfully:", this.fireData);
            
        }).catch((error) => {
            console.error("Error fetching user fire data:", error);
        });
    },
}
</script>