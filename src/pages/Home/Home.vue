<template>
  <div class="h-full flex flex-col">
    <div style="
    background-image: url('https://cdnn1.img.sputnik.tj/img/103106/14/1031061482_0:100:1920:1180_1920x0_80_0_0_ee8e526dcd441226b4ed608e2c6e6e58.jpg');
    " class="h-60 flex flex-col bg-cover bg-center bg-no-repeat">
      <div class="grow flex flex-col items-center justify-end">
        <h1 class="text-white text-3xl font-bold text-center ">🔥 FireAlert System</h1>
      </div>
      <div style="mask-image: linear-gradient(to bottom, transparent, black);
     -webkit-mask-image: linear-gradient(to bottom, transparent, black);" class="bg-gray-100 h-24 w-full"></div>
    </div>
    <!-- Header -->

    <!-- About Us -->
    <div class="grid md:grid-cols-2 justify-between pt-6 h-96">
      <section class="flex flex-col bg-gray-100 px-6 justify-center items-center">
        <h2 class="w-3/5 text-2xl text-center font-bold text-gray-800">About Us</h2>
        <p class="w-3/5 mt-3 text-gray-600 max-w-2xl mx-auto">
          FireAlert System is designed to provide real-time fire alerts and safe evacuation routes
          for the residents of Astana. Users can report fires, receive emergency notifications,
          and view incidents on the map.
        </p>
      </section>
      <section class="h-full w-full relative">
        <RouteToHospital
          v-if="reportData.location.latitude !== null && reportData.location.longitude !== null"
          :startCoordinate="[reportData.location.latitude, reportData.location.longitude]"
        />
        <iframe v-else class="w-full h-full border-2 border-gray-300 shadow-md"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2505.9543937641024!2d71.41574261210563!3d51.0908491716037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x424585a605525605%3A0x4dff4a1973f7567e!2sAstana%20IT%20University!5e0!3m2!1sru!2skz!4v1697979229076!5m2!1sru!2skz"
          width="600" height="400" style="border:0;" allowfullscreen="" loading="lazy"></iframe>

      </section>
    </div>


    <!-- Map Section -->


    <!-- How It Works -->
    <section class="bg-gray-100 gap-2 p-8 grid md:grid-cols-3 w-full">
      <CardsHome v-for="card in cards" :key="card.title" :cardData="card" />
    </section>

    <section>
      <AboutUs />
    </section>

    <!-- Contact Info -->
    <section class="bg-gray-100 py-10 px-6 text-center">
      <h2 class="text-2xl font-bold text-gray-800">Contact Us</h2>
      <p class="mt-3 text-gray-600">For support, reach out to us:</p>
      <p class="text-gray-700 font-medium mt-2">📧 Email: 221000@astanait.edu.kz <br>221000@astanait.edu.kz </p>
      <p class="text-gray-700 font-medium">📞 Phone: +7 (776) 248-2761</p>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white text-center py-4 mt-auto">
      <p>© 2025 FireAlert System. All rights reserved.</p>
      <div class="mt-2 flex justify-center space-x-4">
        <a href="#" class="hover:text-blue-400">Privacy Policy</a>
        <a href="#" class="hover:text-blue-400">Terms of Use</a>
      </div>
    </footer>
  </div>
</template>

<script>
import CardsHome from '@/components/home/CardsHome.vue';
import AboutUs from '@/components/home/AboutUs.vue';
import RouteToHospital from '@/components/Dashboard/RouteToHospital.vue';
import { onMounted, ref } from 'vue';
export default {
  name: 'Home',
  components: {
    AboutUs,
    CardsHome,
    RouteToHospital
  },
  setup() {
    const cards = ref([
      {
        title: 'Report Fires',
        description: 'Users can manually report fires with a photo to verify incidents.',
        backgroundImage: 'https://orda.kz/uploads/sites/2/2022/09/whatsapp-image-2022-09-04-at-14.25.34.jpeg',
        link: '/report'
      },
      {
        title: 'Receive Alerts',
        description: 'Nearby users receive SMS alerts with evacuation routes.',
        backgroundImage: 'https://static.tildacdn.com/tild3935-6437-4164-a364-613963633634/push_1_1.png',
        link: '/report'
      },
      {
        title: 'View Fire Incidents',
        description: 'Check the latest fire incidents marked on the map.',
        backgroundImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVHJFN1EjyuvqdoS-ycrEpG8Tzww4iOMgm3w&s',
        link: '/report'
      }
    ]);
    return { cards };
  },
  data() {
    return {
      reportData: {
        location: {
          latitude: null,
          longitude: null
        }
      },
      errorMessage: '',
      successMessage: ''
    };
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.reportData.location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        console.log('Current location:', this.reportData.location);
        
      }, (error) => {
        this.errorMessage = 'Unable to retrieve location. Please enable location services.';
      });
    } else {
      this.errorMessage = 'Geolocation is not supported by this browser.';
    }
  }
};
</script>

<style scoped>
h1,
h2,
h3 {
  font-family: 'Inter', sans-serif;
}
</style>
