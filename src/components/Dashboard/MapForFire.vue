<template>
  <div id="map" style="height: 400px;"></div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { defineProps } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import fireIcon from '@/assets/fire.png';

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  fireCoordinate: {
    type: Array,
    default: () => []
  }
});

let map = null;

onMounted(() => {
  map = L.map('map').setView([48.0196, 66.9237], 4);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const customIcon = L.icon({
    iconUrl: fireIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  for (const fireGroup of props.data) {
    for (const fire of fireGroup) {
      if (!fire.latitude || !fire.longitude) continue;

      const marker = L.marker([fire.latitude, fire.longitude], { icon: customIcon }).addTo(map);
      marker.bindPopup(`<b>${fire.address}</b><br>${new Date(fire.time_fire).toLocaleString()}`);
    }
  }
});

watch(
  () => props.fireCoordinate,
  (newCoords) => {
    if (newCoords && newCoords.length === 2 && map) {
      map.setView(newCoords, 10);
    }
  }
);
</script>
