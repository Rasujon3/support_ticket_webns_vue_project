<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container mt-5">
      <h2>Welcome, {{ user?.name }}</h2>
      <p>Email: {{ user?.email }}</p>
      <button class="btn btn-danger" @click="logout">Logout</button>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  const store = useStore();
  const router = useRouter();
  
  const user = computed(() => store.state.auth.user);
  
  const logout = () => {
    store.dispatch('auth/logout');
    router.push('/login');
  };
  </script>
  