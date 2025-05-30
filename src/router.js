import { createRouter, createWebHistory } from 'vue-router';
import App from "@/App.vue";
import Login from "@/pages/Authorization/Login.vue";
import Signup from "@/pages/Authorization/Signup.vue";
import Home from "@/pages/Home/Home.vue";
import Dashboard from "@/pages/Home/Dashboard.vue";
import { isAuthenticated } from "@/store/auth.js";
import Profile from './pages/Profile/Profile.vue';
import CreateReport from './pages/Report/CreateReport.vue';
import AdminPage from './pages/AdminPage/AdminPage.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login, meta: { requiresAuth: false, isAdmin: false  } },
    { path: '/signup', component: Signup, meta: { requiresAuth: false, isAdmin: false  } },
    { path: '/profile', component: Profile, meta: { requiresAuth: true, isAdmin: false  } },
    {path: '/report', component: CreateReport, meta: { requiresAuth: true, isAdmin: false  }},
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true, isAdmin: false  } },
    {path: '/adminPage', component: AdminPage, meta: { requiresAuth: true, isAdmin: true } },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async(to, from, next) => {
    const { useAuthStore } = await import("@/store/authStore..js"); // динамический импорт
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !isAuthenticated()) {
        if(to.meta.isAdmin){
            if(authStore.userRole !== 'admin')
                next();
            else
                next('/login');
        }
        else{
            next('/login');
        }
    } else {
        next();
    }
})

export default router;