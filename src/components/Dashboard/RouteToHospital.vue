<template>
  <div id="map" style="height: 380px;"></div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const props = defineProps({
  startCoordinate: {
    type: Array,
    required: true,
    validator: val => val.length === 2 && typeof val[0] === 'number' && typeof val[1] === 'number'
  }
});

let map = null;
let routingControl = null;

async function findNearestHospitalWithExpansion(lat, lon, initialDelta = 0.01, maxDelta = 1, step = 0.01) {
  let delta = initialDelta;

  while (delta <= maxDelta) {
    const viewbox = `${lon - delta},${lat - delta},${lon + delta},${lat + delta}`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=hospital&limit=1&viewbox=${viewbox}&bounded=1`;

    try {
      const res = await fetch(url, {
        headers: {
          'Accept-Language': 'en',
          'User-Agent': 'your-app-name (your@email.com)' // Замените на ваш User-Agent
        }
      });
      const data = await res.json();

      if (data.length > 0) {
        return {
          coords: [parseFloat(data[0].lat), parseFloat(data[0].lon)],
          name: data[0].display_name || 'Ближайшая больница'
        };
      }
    } catch (e) {
      console.error("Error fetching hospital data:", e);
      return null;
    }

    delta += step;
  }

  console.warn('No hospital found within max delta');
  return null;
}

async function setupMapAndRoute(start) {
  if (map) {
    map.remove();
    map = null;
  }

  map = L.map('map').setView(start, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const hospitalData = await findNearestHospitalWithExpansion(start[0], start[1]);
  if (!hospitalData) {
    alert("Nearest hospital not found within search area");
    return;
  }

  if (routingControl) {
    routingControl.remove();
  }

  routingControl = L.Routing.control({
    waypoints: [
      L.latLng(start[0], start[1]),
      L.latLng(hospitalData.coords[0], hospitalData.coords[1])
    ],
    routeWhileDragging: false,
    draggableWaypoints: false,
    addWaypoints: false,
    fitSelectedRoutes: true,
    createMarker: (i, wp) => {
      return L.marker(wp.latLng).bindPopup(i === 0 ? 'Вы здесь' : hospitalData.name);
    }
  }).addTo(map);
}

onMounted(() => {
  if (props.startCoordinate.length === 2) {
    setupMapAndRoute(props.startCoordinate);
  }
});

watch(() => props.startCoordinate, (newVal) => {
  if (newVal && newVal.length === 2) {
    setupMapAndRoute(newVal);
  }
});
</script>
