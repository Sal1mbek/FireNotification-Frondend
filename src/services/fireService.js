import axios from "axios";
import {getAuthHeader} from "@/services/authService.js";

const API_URL = "https://firenotification-backend-1.onrender.com/api/Fire/api/fires";

export async function getFireData(date) {
    try {
        const response = await axios.get(`${API_URL}/fireByDate?date=${date}`,{
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching Fire data", error);
        throw error;
    }
}

export async function createReport(reportData) {
    try {
        const response = await axios.post(`${API_URL}/saveCrowdData`, reportData, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        console.log("Error creating report", error);
        throw error;
    }
}