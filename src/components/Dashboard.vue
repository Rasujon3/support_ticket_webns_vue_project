<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container mt-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">👋 Welcome to Our Support Hub!</h2>
        <p class="text-gray-600 mb-3">We're thrilled to have you here. Our mission is to provide you with seamless support and quick solutions to all your queries.</p>
        <p class="text-indigo-500 font-medium">Ready to get started? <router-link to="/tickets/create" class="hover:underline">Submit a new ticket</router-link>.</p>
      </div>

      <div class="bg-white shadow-md rounded-lg p-6">
        <h3 class="text-lg font-semibold text-gray-700 mb-3">📣 Latest Announcements</h3>
        <ul class="list-disc pl-5 text-gray-600">
          <li class="mb-2">Our knowledge base has been updated with new troubleshooting guides. <a href="#" class="text-indigo-500 hover:underline">Learn More</a></li>
          <li class="mb-2">We're experiencing a slight delay in response times due to high volume. Thank you for your patience.</li>
          <li>New support agents have joined our team to better assist you!</li>
        </ul>
      </div>

      <div class="bg-white shadow-md rounded-lg p-6">
        <h3 class="text-lg font-semibold text-gray-700 mb-3">💡 Tips for Faster Support</h3>
        <ol class="list-decimal pl-5 text-gray-600">
          <li class="mb-2">Please provide a clear and detailed description of your issue.</li>
          <li class="mb-2">Include any relevant screenshots or error messages.</li>
          <li>Specify the product or service you are experiencing problems with.</li>
        </ol>
      </div>

      <div class="bg-white shadow-md rounded-lg p-6 md:col-span-2 lg:col-span-1">
        <h3 class="text-lg font-semibold text-gray-700 mb-3">📚 Featured Knowledge Base Article</h3>
        <p class="text-gray-600 mb-3">Check out our latest article on "<a href="#" class="text-indigo-500 hover:underline font-medium">Troubleshooting Common Login Issues</a>".</p>
        <p class="text-sm text-gray-500">This article provides step-by-step instructions to resolve the most frequent login problems.</p>
      </div>

      <div class="bg-white shadow-md rounded-lg p-6">
        <h3 class="text-lg font-semibold text-gray-700 mb-3">📞 Need Immediate Assistance?</h3>
        <p class="text-gray-600 mb-3">Our dedicated support team is here to help. You can reach us via phone or email.</p>
        <p class="text-sm text-gray-500">Phone: <span class="font-medium text-blue-500">+1 (555) 123-4567</span></p>
        <p class="text-sm text-gray-500">Email: <span class="font-medium text-blue-500">support@example.com</span></p>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref, onMounted } from 'vue';

// You can fetch real-time data here if needed
// const resolvedTickets = ref(125);
// const openTickets = ref(15);
// const pendingTickets = ref(3);
// const averageResolutionTime = ref(4.8);

// onMounted(() => {
//   // Example of fetching data
//   // fetch('/api/dashboard/stats')
//   //   .then(response => response.json())
//   //   .then(data => {
//   //     resolvedTickets.value = data.resolved_tickets;
//   //     openTickets.value = data.open_tickets;
//   //     // ... and so on
//   //   });
// });
</script>

<style scoped>
/* You can add more custom styles here if needed */
.container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

.grid {
  display: grid;
  gap: 1.5rem;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 768px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
  