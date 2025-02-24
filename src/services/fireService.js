import axios from "axios";
import {getAuthHeader} from "@/services/authService.js";

const API_URL = "https://localhost:8080/api/Fire/api/fires/fireByDate";

export async function getFireData(date) {
    try {
        const response = await axios.get(`${API_URL}?date=${date}`,{
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching Fire data", error);
        throw error;
    }
}