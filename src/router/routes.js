import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Dashboard from '../components/Dashboard.vue';
import TicketList from '../components/Tickets/List.vue';
import TicketCreate from '../components/Tickets/Create.vue';
import TicketDetail from '../components/Tickets/Detail.vue';


const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        // meta: { guest: true, hideNavbar: true }
        meta: { hideNavbar: true }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        // meta: { guest: true, hideNavbar: true }
        meta: { hideNavbar: true }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
    },
    { path: '/tickets', component: TicketList },
    { path: '/tickets/create', component: TicketCreate },
    { path: '/tickets/:id', component: TicketDetail, props: true }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Navigation guard
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');

    if (to.meta.requiresAuth && !token) {
        next({ name: 'Login' });
    } else if (to.meta.guest && token) {
        next({ name: 'Dashboard' });
    } else {
        next();
    }
});

export default router;
