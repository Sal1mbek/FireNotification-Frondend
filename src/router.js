import { createRouter, createWebHistory} from 'vue-router';
import App from "@/App.vue";
import Login from "@/pages/Authorization/Login.vue";
import Signup from "@/pages/Authorization/Signup.vue";
import Home from "@/pages/Home/Home.vue";

const  routes = [
    { path: '/', component: Home},
    { path: '/login', component: Login},
    {path: '/signup', component: Signup},
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;