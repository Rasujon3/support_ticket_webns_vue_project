<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="card w-50 mx-auto my-5">
    <div class="container my-5">
      <h2>Login</h2>
      <form @submit.prevent="submit">
        <input v-model="email" type="email" placeholder="Email" class="form-control mb-2" />
        <input v-model="password" type="password" placeholder="Password" class="form-control mb-2" />
        <button class="btn btn-primary">Login</button>
      </form>
      <div class="mt-2">
        <p>Don't have an account? <router-link to="/register">Register</router-link></p>
      </div>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from '../axios';
  import { useRouter } from 'vue-router';
  
  const email = ref('');
  const password = ref('');
  const errors = ref('');
  const router = useRouter();
  
  const submit = async () => {
    try {
      const response = await axios.post('/login', {
        email: email.value,
        password: password.value,
      });
      
      if (!response.data?.data?.token) {
        errors.value = 'Login failed';
      }
  
      localStorage.setItem('token', response.data?.data?.token); // if token is returned
      router.push('/dashboard');
    } catch (error) {
      errors.value = error.response?.data?.message || 'Login failed';
    }
  };
  </script>
  