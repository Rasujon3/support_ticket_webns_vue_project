<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div class="container">
        <router-link class="navbar-brand" to="/dashboard">Support Ticket</router-link>
  
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/tickets">Tickets</router-link>
            </li>
            <li class="nav-item">
              <button class="btn btn-link nav-link" @click="logout">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
//   import axios from '../axios';
import { useStore } from 'vuex';
  
  const store = useStore();
  const router = useRouter();
  
//   const logout = async () => {
//     try {
//       await axios.post('/logout');
//       localStorage.removeItem('token');
//       router.push('/login');
//     } catch (err) {
//       console.error(err);
//     }
//   };
const logout = () => {
    store.dispatch('auth/logout');
    router.push('/login');
  };
  </script>
  