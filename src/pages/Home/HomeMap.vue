<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <h1 class="text-gray-900 text-3xl font-bold text-center my-6">FireAlert System</h1>

    <!-- About Us -->
    <section class="bg-gray-100 py-10 px-6 text-center">
      <h2 class="text-2xl font-bold text-gray-800">About Us</h2>
      <p class="mt-3 text-gray-600 max-w-2xl mx-auto">
        FireAlert System is designed to provide real-time fire alerts.
      </p>
    </section>

    <!-- Map Section -->
    <section class="flex items-center justify-center my-8">
      <iframe
          class="border-2 border-gray-300 shadow-md rounded-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2505.9543937641024!2d71.41574261210563!3d51.0908491716037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x424585a605525605%3A0x4dff4a1973f7567e!2sAstana%20IT%20University!5e0!3m2!1sru!2skz!4v1697979229076!5m2!1sru!2skz"
          width="600"
          height="400"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
      ></iframe>
    </section>

    <!-- How It Works -->
    <section class="bg-white py-10 px-6 text-center">
      <h2 class="text-2xl font-bold text-gray-800">How It Works</h2>
      <div class="flex flex-wrap justify-center mt-6 space-x-6">
        <div class="max-w-xs p-4 border rounded-lg shadow-md bg-gray-50">
          <h3 class="font-semibold text-lg text-gray-700">📍 Report Fires</h3>
          <p class="text-gray-600 mt-2">Users can manually report fires with a photo to verify incidents.</p>
        </div>
        <div class="max-w-xs p-4 border rounded-lg shadow-md bg-gray-50">
          <h3 class="font-semibold text-lg text-gray-700">🔔 Receive Alerts</h3>
          <p class="text-gray-600 mt-2">Nearby users receive SMS alerts with evacuation routes.</p>
        </div>
        <div class="max-w-xs p-4 border rounded-lg shadow-md bg-gray-50">
          <h3 class="font-semibold text-lg text-gray-700">🗺️ View Fire Incidents</h3>
          <p class="text-gray-600 mt-2">Check the latest fire incidents marked on the map.</p>
        </div>
      </div>
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
export default {
  name: 'Home',
};
</script>

<style scoped>
h1, h2, h3 {
  font-family: 'Inter', sans-serif;
}
</style>
