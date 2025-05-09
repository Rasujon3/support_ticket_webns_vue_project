<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container mt-4">
      <h4 class="mb-4">Create New Ticket</h4>
  
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label class="form-label">Title <span class="text-danger">*</span></label>
          <input
            v-model="form.title"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.title }"
            required
          />
          <div v-if="errors.title" class="invalid-feedback">{{ errors.title[0] }}</div>
        </div>
  
        <div class="mb-3">
          <label class="form-label">Priority <span class="text-danger">*</span></label>
          <select
            v-model="form.priority"
            class="form-select"
            :class="{ 'is-invalid': errors.priority }"
            required
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div v-if="errors.priority" class="invalid-feedback">{{ errors.priority[0] }}</div>
        </div>
  
        <div class="mb-3">
          <label class="form-label">Description <span class="text-danger">*</span></label>
          <textarea
            v-model="form.description"
            rows="4"
            class="form-control"
            :class="{ 'is-invalid': errors.description }"
            required
          ></textarea>
          <div v-if="errors.description" class="invalid-feedback">{{ errors.description[0] }}</div>
        </div>
  
        <button type="submit" class="btn btn-success">Submit Ticket</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue';
  import axios from '../../axios';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const form = reactive({
    title: '',
    priority: '',
    description: '',
  });
  
  const errors = ref({});
  
  const submitForm = async () => {
    errors.value = {}; // reset
  
    try {
      await axios.post('/tickets', form);
      router.push('/tickets'); // redirect to ticket list
    } catch (err) {
      if (err.response?.status === 422) {
        errors.value = err.response.data.errors;
      } else {
        alert('Something went wrong.');
      }
    }
  };
  </script>
  