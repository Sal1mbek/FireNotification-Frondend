<script setup>
import Navbar from "@/components/navbar/navbar.vue";
</script>

<template>
  <div class="app">
    <div class="w-full container">
      <div class="flex flex-col">
      <Navbar />
    </div>
      <div class="flex-grow bg-gray-100">
        <router-view></router-view>
      </div></div>
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
