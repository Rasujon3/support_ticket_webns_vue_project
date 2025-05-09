import { createApp } from 'vue';
import App from './App.vue';
import router from './router/routes'; // your router file
import store from './store/index';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import api from './axios';

const app = createApp(App);

app.config.globalProperties.$axios = api;

app.use(store);
app.use(router);

app.mount('#app');
// This is the main entry point of your Vue.js application.