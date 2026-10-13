import { useAuth } from "@/store/auth-store";
import { fetchAPI } from "./client";

export const sendPushToken = async (pushToken: string) => {
    const token = useAuth.getState().token;
    const response = await fetchAPI(`${process.env.EXPO_PUBLIC_API_URL}/users/pushToken`,{
        method: 'PATCH',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        body: JSON.stringify({pushToken})
    })
    if(!response.ok){
        throw new Error("Impossible de charger Token de projet");
    }else{
        return response.json();
    }
} 