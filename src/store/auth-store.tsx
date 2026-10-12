import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from "jwt-decode";
import { create } from 'zustand';
interface AuthState {
    userId : string | null;
    token : string | null;
    login : (token : string) => Promise<void>;
    logout : () => Promise<void>;
    loadToken : () => Promise<void>;
}

export const useAuth = create<AuthState>((set)=>({
    token : null,
    userId: null,
    login : async(token) => {
        const playload = jwtDecode(token);
        await SecureStore.setItemAsync('token',token);
        set({token});
        set({userId : playload.sub})
    },
    logout : async() => {
        await SecureStore.deleteItemAsync('token');
        set({token : null, userId: null});
    },
    loadToken : async() => {
        const token = await SecureStore.getItemAsync('token');
        set({token});
        if(token){
        const playload = jwtDecode(token);
        set({userId: playload.sub})
        }
    }
}))