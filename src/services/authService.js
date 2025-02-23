import axios from "axios";

const API_URL = "https://localhost:8080/api/user/api/users"; // Adjust based on your backend route

export async function login(email, password) {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password,
        });

        if (response.data.token) {
            localStorage.setItem("token", response.data.token); // Store JWT token
        }
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export async function register(username, email, password) {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            username,
            email,
            password,
        });
        console.log(response)
        return response.data;
    } catch (error) {
        console.log(error)
        throw error.response ? error.response.data : error;
    }
}


export function getAuthHeader() {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
}
