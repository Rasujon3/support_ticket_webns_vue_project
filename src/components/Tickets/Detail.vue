<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container mt-4" v-if="ticket">
      <h4 class="mb-3">Ticket #{{ ticket.id }} - {{ ticket.title }}</h4>
  
      <div class="mb-4">
        <p><strong>Status:</strong> <span class="badge bg-info text-dark">{{ capitalize(ticket.status) }}</span></p>
        <p><strong>Priority:</strong> <span class="badge bg-secondary">{{ capitalize(ticket.priority) }}</span></p>
        <p><strong>Created At:</strong> {{ formatDate(ticket.created_at) }}</p>
        <p><strong>Assigned To:</strong> {{ ticket.assigned_to?.name ?? 'Not Assigned' }}</p>
      </div>
  
      <hr />
  
      <h5 class="mb-3">Conversation</h5>
      <div v-if="messages.length">
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="mb-4 p-3 border rounded"
          :class="{ 'bg-light': msg.user_id === currentUserId }"
        >
          <div class="d-flex justify-content-between mb-1">
            <strong>{{ msg.user?.name }}</strong>
            <small>{{ formatTimeAgo(msg.created_at) }}</small>
          </div>
          <p>{{ msg.message }}</p>
  
          <div v-if="msg.attachments && msg.attachments.length">
            <strong>Attachments:</strong>
            <ul class="list-unstyled">
              <li v-for="file in msg.attachments" :key="file.id">
                <a :href="`${baseUrl}/${file.file_path}`" target="_blank">{{ file.original_name }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p v-else>No messages yet.</p>
  
      <hr />
  
      <h5 class="mb-3">Reply</h5>
      <form @submit.prevent="sendReply" enctype="multipart/form-data">
        <div class="mb-3">
          <label class="form-label">Your Message</label>
          <textarea v-model="newMessage" class="form-control" rows="4" required></textarea>
        </div>
  
        <div class="mb-3">
          <label class="form-label">Attachments</label>
          <input type="file" class="form-control" multiple @change="handleFiles" />
        </div>
  
        <button type="submit" class="btn btn-primary">Send Reply</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from '../../axios';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
//   const router = useRouter();
  const ticketId = route.params.id;
  
  const ticket = ref(null);
  const messages = ref([]);
  const newMessage = ref('');
  const attachments = ref([]);
  const currentUserId = ref(null); // You can load this from your auth logic
  const baseUrl = 'http://localhost:8000'; // or use import.meta.env.VITE_API_BASE_URL if using env vars

  const getData = async () => {
    const res = await axios.get(`/tickets/${ticketId}`);
    ticket.value = res.data?.data?.ticket;
    messages.value = res.data?.data?.messages;
    currentUserId.value = res.data?.data?.auth_user_id; // set this on backend if needed
  };

  // eslint-disable-next-line no-unused-vars
  // const listener = () => {
  //   window.Echo.private(`chat.${ticketId}`)
  //     .listen('NewMessageSent', (e) => {
  //       console.log('New message received:', e);
        
  //       messages.value.push(e); // append new message
  //     });
  // };
  
  onMounted(() => {
    getData();
    // listener();
  });
  
  const handleFiles = (event) => {
    attachments.value = Array.from(event.target.files);
  };
  
  const sendReply = async () => {
    const formData = new FormData();
    formData.append('message', newMessage.value);
    attachments.value.forEach((file, index) => {
      formData.append(`attachments[${index}]`, file);
    });
  
    try {
      await axios.post(`/messages/${ticketId}`, formData);
      newMessage.value = '';
      attachments.value = [];
      await refreshMessages();
    } catch (error) {
      console.error('Error sending message:', error.message);
      alert('Failed to send message. Please try again.',error.message);
    }
  };
  
  const refreshMessages = async () => {
    getData();
  };
  
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const formatDate = (dateStr) => new Date(dateStr).toLocaleString();
  const formatTimeAgo = (dateStr) => {
    const diff = Math.floor((new Date() - new Date(dateStr)) / 1000 / 60); // in minutes
    if (diff < 60) return `${diff} minutes ago`;
    const hrs = Math.floor(diff / 60);
    return `${hrs} hour${hrs > 1 ? 's' : ''} ago`;
  };
  </script>
  