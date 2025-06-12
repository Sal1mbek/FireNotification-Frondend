<!-- src/components/home/CardsHome.vue -->
<template>
  <div
    class="relative p-5 border rounded-lg flex justify-between items-top"
  >
  <div
    class="absolute inset-0 rounded-lg pointer-events-none"
    :style="{
      backgroundImage: `url(${cardData.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      opacity: 0.3
    }"
  ></div>
    <div class="flex flex-col z-10">
      <h3 class="font-semibold text-4xl text-gray-700">{{ cardData.title }}</h3>
      <p class="text-gray-600 mt-2">{{ cardData.description }}</p>
    </div>
    <div>
      <div v-if="cardData.link !== '/installApp'" class="rounded-full flex border-2 border-gray-700 p-1"
        @click="navigateTo(cardData.link)"
        style="cursor: pointer;">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" class="size-7">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
        </svg>
      </div>
      <a v-else   href="/app-release.apk"
  download="app-release.apk" class="rounded-full flex border-2 border-gray-700 p-1"
        style="cursor: pointer;">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" class="size-7">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const props = defineProps<{
  cardData: {
    title: string;
    description: string;
    backgroundImage: string;
    link: string;
  };
}>();
const router = useRouter();
const navigateTo = (path: string) => {
  router.push(path);
};
const installApp = () =>{

}
</script>
