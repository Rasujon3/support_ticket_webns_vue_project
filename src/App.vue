<template>
  <Navbar v-if="!$route.meta.hideNavbar"/>
  <router-view />
</template>

<script setup>
// no need to import HelloWorld
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';

const $route = useRoute();
</script>
