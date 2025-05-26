import axios from "axios";
import {getAuthHeader} from "@/services/authService.js";

const API_URL = "https://firenotification-backend-1.onrender.com/api/CrowdData/api/crowd/user";

export async function getUserFireData(userId) {
    try {
        const response = await axios.get(`${API_URL}/firedata?userId=${userId}`,{
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching Fire data", error);
        throw error;
    }
}