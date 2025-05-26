import axios from "axios";
import { useAuthStore } from "@/store/authStore..js";

const API_URL = "https://firenotification-backend-1.onrender.com/api/User/api/users"; // Adjust based on your backend route

export async function login(email, password) {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password,
        });

        if (response.data.token) {
            localStorage.setItem("token", response.data.token); // Store JWT token

            const authStore = useAuthStore();
            authStore.login(response.data.token);
        }
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export async function register(username, email, password, phoneNumber) {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            username,
            email,
            password,
            phoneNumber
        });
        console.log(response)
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}


export function getAuthHeader() {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
}
