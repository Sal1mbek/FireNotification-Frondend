import { createRouter, createWebHistory } from 'vue-router';
import App from "@/App.vue";
import Login from "@/pages/Authorization/Login.vue";
import Signup from "@/pages/Authorization/Signup.vue";
import Home from "@/pages/Home/Home.vue";
import Dashboard from "@/pages/Home/Dashboard.vue";
import { isAuthenticated } from "@/store/auth.js";
import Profile from './pages/Profile/Profile.vue';
import CreateReport from './pages/Report/CreateReport.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login, meta: { requiresAuth: false } },
    { path: '/signup', component: Signup, meta: { requiresAuth: false } },
    { path: '/profile', component: Profile, meta: { requiresAuth: false } },
    {path: '/report', component: CreateReport, meta: { requiresAuth: false }},
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: false } }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated()) {
        next('/login');
    } else {
        next();
    }
})

export default router;