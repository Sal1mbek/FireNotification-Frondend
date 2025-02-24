import { createRouter, createWebHistory} from 'vue-router';
import App from "@/App.vue";
import Login from "@/pages/Authorization/Login.vue";
import Signup from "@/pages/Authorization/Signup.vue";
import Home from "@/pages/Home/Home.vue";
import Dashboard from "@/pages/Home/Dashboard.vue";
import {isAuthenticated} from "@/store/auth.js";

const  routes = [
    { path: '/', component: Home},
    { path: '/login', component: Login, meta: { requiresAuth: false } },
    {path: '/signup', component: Signup, meta: { requiresAuth: false }},
    {path: '/dashboard', component: Dashboard, meta: { requiresAuth: true }}
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