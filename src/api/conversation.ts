import { useAuth } from "@/store/auth-store";
import { fetchAPI } from "./client";

export async function fetchConversation(){
    const token = useAuth.getState().token;
    const response = await fetchAPI(`${process.env.EXPO_PUBLIC_API_URL}/conversations`,{
        headers: {'Content-Type' : 'application/json', 'Authorization' : `Bearer ${token}`}
    });
    if(!response.ok){
        throw new Error("Impossible de charger les conversations");
    }else{
        return response.json();
    }
}
export async function createConversation(vendeurId : string){
    const token = useAuth.getState().token;
    const response = await fetchAPI(`${process.env.EXPO_PUBLIC_API_URL}/conversations`,{
        method: 'POST',
        headers: {'Content-Type' : 'application/json', 'Authorization' : `Bearer ${token}`},
        body : JSON.stringify({vendeurId})
    })
    if(!response.ok){
        throw new Error("Impossible de charger les conversations");
    }else{
        return response.json();
    }
}
export async function fetchConversationById(idConversation: string){
    const token = useAuth.getState().token;
    const response = await fetchAPI(`${process.env.EXPO_PUBLIC_API_URL}/conversations/${idConversation}`,{
        headers : {'Authorization' : `Bearer ${token}`}
    })
    if(!response.ok){
        throw new Error("Impossible de trouver la conversation");
    }else{
        return response.json();
    }
}