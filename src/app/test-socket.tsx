import { useEffect, useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { io, Socket } from "socket.io-client";

export default function TestSocket(){
    const socketRef = useRef<Socket | null>(null);
    const [texte, setTexte] = useState("");
    const [reponse, setReponse] = useState("");
    useEffect(()=> {
        socketRef.current = io(process.env.EXPO_PUBLIC_API_URL);
        socketRef.current.on('pong',(data) => {
            setReponse(data);
        })
        return () => {
            socketRef.current?.disconnect();
        } 
    },[])
    const envoyerPing = () => {
        socketRef.current?.emit('ping',texte);
    } 
    return (
        <View>
            <TextInput placeholder="votre message a envoyer" onChangeText={setTexte}></TextInput>
            <Pressable onPress={envoyerPing}><Text>Envoyer ping</Text></Pressable>
            <Text> Reponse coté serveur : {reponse} </Text>
            
        </View>
    )

}