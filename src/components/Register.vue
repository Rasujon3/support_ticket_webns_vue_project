<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="">
    <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="card w-50 mx-auto my-5 col-md-5">
        <h4 class="mb-4">Register</h4>

        <form @submit.prevent="handleRegister">
          <div class="mb-3">
            <label for="name" class="form-label">Full Name</label>
            <input
              v-model="form.name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.name }"
              required
              autofocus
            />
            <div v-if="errors.name" class="invalid-feedback">{{ errors.name[0] }}</div>
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              v-model="form.email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors.email }"
              required
            />
            <div v-if="errors.email" class="invalid-feedback">{{ errors.email[0] }}</div>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              v-model="form.password"
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors.password }"
              required
            />
            <div v-if="errors.password" class="invalid-feedback">{{ errors.password[0] }}</div>
          </div>

          <div class="mb-3">
            <label for="password_confirmation" class="form-label">Confirm Password</label>
            <input
              v-model="form.password_confirmation"
              type="password"
              class="form-control"
              required
            />
          </div>

          <button type="submit" class="btn btn-success w-100">Register</button>
        </form>

        <div class="mt-3 text-center">
          <p>Already have an account? <router-link to="/login">Login</router-link></p>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from '../axios';
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const errors = ref({})

const handleRegister = async () => {
  errors.value = {}
  try {
    console.log('Form data:', form);
    
    await axios.post('/register', form)
    alert('Registration successful! Please login.');
    router.push('/login') // or home/dashboard if auto-login
  } catch (error) {
    if (error.response && error.response.status === 422) {
      errors.value = error.response.data.errors || {}
    }
    alert('Registration failed. Please try again.',error.message);
  }
}
</script>

  