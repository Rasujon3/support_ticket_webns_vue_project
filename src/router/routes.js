import { createRouter, createWebHistory } from 'vue-router';
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
        component: () => import('../components/Login.vue'),
        // meta: { guest: true, hideNavbar: true }
        meta: { hideNavbar: true }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../components/Register.vue'),
        // meta: { guest: true, hideNavbar: true }
        meta: { hideNavbar: true }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../components/Dashboard.vue'),
        meta: { requiresAuth: true }
    },
    { path: '/tickets', component: TicketList },
    { path: '/tickets/create', component: TicketCreate },
    { path: '/tickets/:id', component: TicketDetail, props: true },
    {
        path: '/tickets/:id/assign',
        name: 'AssignTicket',
        component: () => import('../components/Tickets/AssignForm.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/tickets/:id/status',
        name: 'TicketStatus',
        component: () => import('../components/Tickets/StatusForm.vue'),
        meta: { requiresAuth: true }
    }


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
