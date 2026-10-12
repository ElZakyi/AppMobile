import { useAuth } from "@/store/auth-store";
import { router } from "expo-router";

export const fetchAPI = async (url: string, options?: RequestInit) => {
    const response = await fetch(url, options);
    if(response.status === 401){
        useAuth.getState().logout();
        router.replace("/login");
    }
    return response;
}