<template>
    <div class="container mt-4">
      <h4 class="mb-3">Assign Ticket #{{ ticket.id }} - {{ ticket.title }}</h4>
      <hr />
  
      <form @submit.prevent="assignTicket">
        <div class="mb-3">
          <label class="form-label">Assign to Admin <span class="text-danger">*</span></label>
          <select
            v-model="form.assigned_to"
            class="form-select"
            required
          >
            <option value="">-- Select Admin --</option>
            <option
              v-for="admin in admins"
              :key="admin.id"
              :value="admin.id"
            >
              {{ admin.name }} ({{ admin.email }})
            </option>
          </select>
        </div>
  
        <button type="submit" class="btn btn-sm btn-warning">Assign</button>
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
  const admins = ref([]);
  const form = ref({
    assigned_to: '',
  });
  
//   const token = localStorage.getItem('token');
  
  onMounted(async () => {
    try {
      const res = await axios.get(`/tickets/${route.params.id}/assign`);
      
      ticket.value = res.data?.data?.ticket;
      admins.value = res.data?.data?.admins;
      form.value.assigned_to = ticket.value.assigned_to;
    } catch (err) {
      alert('Failed to load ticket or admin list.');
    }
  });
  
  const assignTicket = async () => {
    try {
      await axios.put(
        `/tickets/${route.params.id}/assign`, form.value);
      alert('Ticket assigned successfully');
      router.push('/tickets');
    } catch (err) {
      alert('Failed to assign ticket.');
    }
  };
  </script>
  