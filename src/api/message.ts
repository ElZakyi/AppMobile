import { useAuth } from "@/store/auth-store";
import { fetchAPI } from "./client";

export const fetchMessages = async (idConversation: string) => {
    const token = useAuth.getState().token
    const response = await fetchAPI(`${process.env.EXPO_PUBLIC_API_URL}/messages/conversation/${idConversation}`,{
        headers:{'Authorization' : `Bearer ${token}`}
    });
    if(!response.ok){
        throw new Error("Impossible de charger les messages de la conversation");
    }
    else{
        return response.json();
    }
}