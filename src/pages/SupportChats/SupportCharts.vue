<template>
    <div class="fixed z-[9999] right-3 bottom-3 md:right-5 md:bottom-5">
        <div v-if="!isOpen" :onclick="handleChatVisibility" class="flex text-white bg-gradient-to-r from-red-400 to-orange-400 justify-center items-center p-2 rounded-full cursor-pointer">
            <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="md:size-9 size-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
        </div>
        <div v-else class="shadow rounded-lg bg-white rounded-2xl flex flex-col md:w-[450px] w-[350px] h-[450px]">
            <div id="header" class="bg-gradient-to-r rounded-t-2xl from-red-400 to-orange-400 px-6 py-4 flex items-center justify-between">
                <h3 class="flex justify-between items-center w-full text-white font-medium text-lg">
                    <p>Fire Alert Support</p>
                    <svg :onclick="handleChatVisibility" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                    </svg>
                </h3>
            </div>
            <div id="body" class="flex flex-col justify-between h-full">
                <div class="px-6 grow">

                </div>
                <div id="footer" class="mb-1 px-6 border-t-2 border-graw-300 h-[50px] flex w-full justify-between items-center">
                    <input class=" focus:outline-none focus:shadow-outline w-full h-full" placeholder="Type here..."/>
                    <svg viewBox="0 0 24 24" class="w-7 h-7 cursor-pointer">
                        <defs>
                            <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style="stop-color:#f87171" />
                            <stop offset="100%" style="stop-color:#fb923c" />
                            </linearGradient>
                        </defs>
                        <path 
                            fill="url(#iconGradient)" 
                            d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" 
                        />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    name: "SupportChats",
    data(){
        return{
            isOpen: false
        }
    },
    methods:{
        handleChatVisibility(){
            this.isOpen = !this.isOpen
        }
    },
}
</script>