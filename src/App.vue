<script setup>
import Navbar from "@/components/navbar/navbar.vue";
import SupportCharts from "./pages/SupportChats/SupportCharts.vue";
</script>

<template>
  <div class="app">
    <div class="w-full">
      <div class="flex flex-col">
      <Navbar />
    </div>
      <div class="flex-grow bg-gray-100">
        <router-view></router-view>
      </div></div>
    <SupportCharts/>
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
