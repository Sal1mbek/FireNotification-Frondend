import axios from "axios";

const API_URL = "https://firenotification-backend-1.onrender.com/api/SupportChat";

export async function createTicket() {
    try {
        const response = await axios.post(`${API_URL}/create-ticket`);
        return response.data;
    } catch (error) {
        console.log("Error fetching Fire data", error);
        throw error;
    }
}