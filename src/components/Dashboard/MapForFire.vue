<template>
  <div id="map" :style="{height: props.height}"></div>
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
  },
  scale: {
    type: Number
  },
  height: {
    type: String,
    default: '400px'
  }
});
let markers = [];
let map = null;

onMounted(() => {
  if(props.fireCoordinate.length === 2 && props.fireCoordinate.every(coord => typeof coord === 'number')) {
    map = L.map('map').setView(props.fireCoordinate,props.scale ? props.scale : 4);
  } else {
    map = L.map('map').setView([48.0196, 66.9237], props.scale ? props.scale : 4);
  }

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  (function() {
      var control = new L.Control({position:'bottomright'});
      control.onAdd = function(map) {
          var azoom = L.DomUtil.create('a','resetzoom');
          azoom.innerHTML = `
          <div class="bg-white rounded border-2 border-gray-300 p-[2px] shadow-lg">
          <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="size-7 cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
            </svg></div>
          `;
          L.DomEvent
            .disableClickPropagation(azoom)
            .addListener(azoom, 'click', function() {
              map.setView([48.0196, 66.9237], props.scale ? props.scale : 4);
            },azoom);
          return azoom;
        };
      return control;
    }())
    .addTo(map);

  const customIcon = L.icon({
    iconUrl: fireIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
  if(props.data && props.data.length !== 0) {
    for (const fireGroup of props.data) {
      for (const fire of fireGroup) {
        if (!fire.latitude || !fire.longitude) continue;
        const marker = L.marker([fire.latitude, fire.longitude], { icon: customIcon }).addTo(map);
        let marked = null;
        if(fire.address && fire.time_fire)
          marked = marker.bindPopup(`<b>${fire.address}</b><br>${new Date(fire.time_fire).toLocaleString()}`);
          markers.push(marked);
      }
    }
  }
});

watch(
  () => props.fireCoordinate,
  (newCoords) => {
    if (newCoords && newCoords.length === 2 && map) {
      map.setView(newCoords, props.scale ? props.scale : 10);
      for (const marker of markers) {
        if(marker && marker._latlng.lat === newCoords[0] && marker._latlng.lng === newCoords[1]) {
          marker.openPopup();
          return;
        }
      }
    }
  }
);
</script>
