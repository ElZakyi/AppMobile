import { useAuth } from '@/store/auth-store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router, Stack } from "expo-router";
import { useEffect } from 'react';
const queryClient = new QueryClient();

export default function RootLayout(){
    useEffect(() => {
    const  init = async() => {
        await useAuth.getState().loadToken();
        if(useAuth.getState().token === null){
            router.replace("/login");
        }else{
            router.replace("/");
        }
    }
    init();
}, []);
    return (
        <QueryClientProvider client={queryClient}>
            <Stack>
            <Stack.Screen name='register'/>
            <Stack.Screen name='login'/>
            <Stack.Screen name="(tabs)" options={{headerShown:false , title : 'Acceuil'}}/>
            <Stack.Screen name="annonce/[id]" options={{title:"Détails de l'annonce"}}/>
        </Stack>
        </QueryClientProvider>
        
    )
}