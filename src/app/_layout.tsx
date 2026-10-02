import { Stack } from "expo-router";

export default function RootLayout(){
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown:false , title : 'Acceuil'}}/>
            <Stack.Screen name="annonce/[id]" options={{title:"Détails de l'annonce"}}/>
        </Stack>
    )
}