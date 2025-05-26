<template>
    <div class="h-full w-full bg-white flex justify-center grid md:grid-cols-8 px-10 pt-12">
        <div class="col-start-2 col-end-4 flex flex-col justify-center">
            <div class="flex flex-col gap-3">
                <div class="flex justify-center">
                    <img class="rounded-full w-44 h-44 object-cover" src="../../assets/profile.png" />
                </div>
                <p class="justify-center items-center flex text-lg">Khamitov Esimgali</p>
            </div>
            <ul class="pt-6 text-gray-500 flex flex-col gap-2">
                <li class="flex justify-between">
                    <div>Email</div>
                    <div class="text-black">esim@mail.ru</div>
                </li>
                <li class="flex justify-between">
                    <div>Phone number</div>
                    <div class="text-black">87052562054</div>
                </li>
            </ul>
        </div>
        <div class="col-start-5 col-end-9 flex flex-col justify-center">
            <div v-for="fire in fireData" class="mb-4 p-4 border rounded-lg shadow-md">
                <img
                    :src="`data:image/jpeg;base64,${fire.photo}`"
                    alt="Base64 Photo"
                    class="w-full object-cover"
                    />
                <p><strong>Address:</strong> {{ fire.address }}</p>
                <p><strong>Time of Fire:</strong> {{ new Date(fire.time_fire).toLocaleString() }}</p>
                <p><strong>Description:</strong> {{ fire.definition }}</p>

            </div>
        </div>
    </div>
</template>
<script>
import { getUserFireData } from "@/services/crowdDataService";
export default {
    name: 'Profile',
    data() {
        return {
            fireData: [],
        }
    },
    mounted () {
        getUserFireData(localStorage.getItem('userId')).then((response) => {
            this.fireData = response;
            console.log("User fire data fetched successfully:", this.fireData);
            
        }).catch((error) => {
            console.error("Error fetching user fire data:", error);
        });
    },
}
</script>