import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token') || null);
    const role = ref(localStorage.getItem('role') || null);

    const isAuthenticated = computed(() => !!token.value);
    const userRole = computed(() => role.value);

    function login(userToken, userRoleValue) {
        token.value = userToken;
        role.value = userRoleValue;

        localStorage.setItem('token', userToken);
        localStorage.setItem('role', userRoleValue);
    }

    function logout() {
        token.value = null;
        role.value = null;

        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }

    function setRole(newRole) {
        role.value = newRole;
        localStorage.setItem('role', newRole);
    }

    return { token, role, isAuthenticated, userRole, login, logout, setRole };
});
