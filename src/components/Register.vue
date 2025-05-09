<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container mt-5">
      <h2>Register</h2>
      <form @submit.prevent="submit">
        <input v-model="name" placeholder="Name" class="form-control mb-2" />
        <input v-model="email" type="email" placeholder="Email" class="form-control mb-2" />
        <input v-model="password" type="password" placeholder="Password" class="form-control mb-2" />
        <button class="btn btn-success">Register</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const store = useStore();
  const router = useRouter();
  
  const submit = async () => {
    try {
      await store.dispatch('auth/register', { name: name.value, email: email.value, password: password.value });
      router.push('/login');
    } catch (e) {
      alert('Registration failed');
    }
  };
  </script>
  