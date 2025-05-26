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

async function findNearestHospital(lat, lon) {
  const delta = 0.1;
  const viewbox = `${lon - delta},${lat - delta},${lon + delta},${lat + delta}`;
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=hospital&limit=1&viewbox=${viewbox}&bounded=1`;
  try {
    const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
    const data = await res.json();
    if (data.length > 0) {
      console.log('Nearest hospital found:', data[0]);
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    } else {
      console.log('No hospital found');
      return null;
    }
  } catch (e) {
    console.error("Error fetching hospital data:", e);
    return null;
  }
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

  const hospital = await findNearestHospital(start[0], start[1]);
  if (!hospital) {
    alert("Nearest hospital not found");
    return;
  }

  if (routingControl) {
    routingControl.remove();
  }

  routingControl = L.Routing.control({
    waypoints: [
      L.latLng(start[0], start[1]),
      L.latLng(hospital[0], hospital[1])
    ],
    routeWhileDragging: false,
    draggableWaypoints: false,
    addWaypoints: false,
    show: false,
    fitSelectedRoutes: true,
    createMarker: (i, wp) => L.marker(wp.latLng)
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
