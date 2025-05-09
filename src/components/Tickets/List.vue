<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container mt-4">
      <h4 class="mb-3">My Tickets</h4>
  
      <div v-if="!isAdmin" class="mb-3">
        <router-link to="/tickets/create" class="btn btn-primary">Create New Ticket</router-link>
      </div>
  
      <table class="table table-bordered table-striped">
        <thead class="table-light">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="tickets.length === 0">
            <td colspan="6">No tickets found.</td>
          </tr>
          <tr v-for="ticket in tickets" :key="ticket.id">
            <td>{{ ticket.id }}</td>
            <td>{{ ticket.title }}</td>
            <td><span class="badge bg-info text-dark">{{ capitalize(ticket.status) }}</span></td>
            <td><span class="badge bg-secondary">{{ capitalize(ticket.priority) }}</span></td>
            <td>{{ formatDate(ticket.created_at) }}</td>
            <td>
              <router-link :to="`/tickets/${ticket.id}`" class="btn btn-sm btn-outline-primary me-1">View</router-link>
  
              <router-link
                v-if="isAdmin"
                :to="`/tickets/${ticket.id}/assign`"
                class="btn btn-sm btn-warning me-1"
              >Assign</router-link>
  
              <router-link
                v-if="isAdmin && ticket.assigned_to === authUserId"
                :to="`/tickets/${ticket.id}/status`"
                class="btn btn-sm btn-info"
              >Change Status</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from '../../axios'; // ensure this is configured with Bearer token
  import { useRouter } from 'vue-router';
  
  const tickets = ref([]);
  const isAdmin = ref(false);
  const authUserId = ref(null);
  const router = useRouter();
  
  const fetchTickets = async () => {
    try {
      const res = await axios.get('/tickets');
      console.log('Tickets response:', res.data);
      
      tickets.value = res.data?.data?.data?.data || [];
      isAdmin.value = res.data?.meta?.is_admin || false;
      authUserId.value = res.data?.meta?.auth_user_id || null;
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) router.push('/login');
    }
  };
  
  onMounted(fetchTickets);
  
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  });
  </script>
  