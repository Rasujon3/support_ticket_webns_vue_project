<template>
    <div class="container mt-4">
      <h4 class="mb-3">Update Status for Ticket #{{ ticket.id }} - {{ ticket.title }}</h4>
      <hr />
  
      <form @submit.prevent="updateStatus">
        <div class="mb-3">
          <label class="form-label">Update Status <span class="text-danger">*</span></label>
          <select v-model="form.status" class="form-select" required>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
  
        <button type="submit" class="btn btn-sm btn-info">Update Status</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import axios from '../../axios';
  
  const route = useRoute();
  const router = useRouter();
  
  const ticket = ref({});
  const form = ref({ status: '' });
  
//   const token = localStorage.getItem('token');
  
  onMounted(async () => {
    try {
      const res = await axios.get(`/tickets/${route.params.id}/status`);
  
      ticket.value = res.data.data.ticket;
      form.value.status = ticket.value.status;
    } catch (err) {
      alert('Failed to load ticket status.');
    }
  });
  
  const updateStatus = async () => {
    try {
      await axios.put(
        `/tickets/${route.params.id}/status`,form.value);
      alert('Ticket status updated successfully');
      router.push('/tickets');
    } catch (err) {
      alert('Status update failed.');
    }
  };
  </script>
  