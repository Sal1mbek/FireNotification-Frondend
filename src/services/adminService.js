import axios from "axios";

const API_URL = "https://firenotification-backend-1.onrender.com/api/Admin/api/users"; // Adjust based on your backend route
export function getAuthHeader() {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
}
export async function getAllUsers(){
    try {
        const response = await axios.get(`${API_URL}/allUsers`, {
                    headers: getAuthHeader(),
                });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export async function changeUserRole (userId, role){
    try {
        const response = await axios.put(`${API_URL}/changeRole`,{userId, role}, {
                    headers: getAuthHeader(),
                });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}