import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
interface AuthState {
    token : string | null;
    login : (token : string) => Promise<void>;
    logout : () => Promise<void>;
    loadToken : () => Promise<void>;
}

export const useAuth = create<AuthState>((set)=>({
    token : null,
    login : async(token) => {
        await SecureStore.setItemAsync('token',token);
        set({token});
    },
    logout : async() => {
        await SecureStore.deleteItemAsync('token');
        set({token : null});
    },
    loadToken : async() => {
        const token = await SecureStore.getItemAsync('token');
        set({token});
    }
}))