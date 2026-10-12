import { fetchConversationById } from "@/api/conversation";
import { fetchMessages } from "@/api/message";
import { useAuth } from "@/store/auth-store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { io, Socket } from "socket.io-client";

export default function ConversationScreen(){
    const [message, setMessage] = useState("");
    const idExpiditeur = useAuth.getState().userId;
    const { id } = useLocalSearchParams();
    const queryClient = useQueryClient();
    const socketRef = useRef<Socket|null>(null);

    const {data : messages} = useQuery({
        queryFn: () => fetchMessages(id as string),
        queryKey: ['messages', id]
    });
    const {data : conversation} = useQuery({
        queryKey: ['conversation', id],
        queryFn : () => fetchConversationById(id as string)
    });

    let idReceveur = null;
    if(conversation){
        idReceveur = conversation.acheteur.id !== idExpiditeur ? conversation.acheteur.id : conversation.vendeur.id;
    }

    useEffect(()=>{
        socketRef.current = io(process.env.EXPO_PUBLIC_API_URL);
        socketRef.current.emit('join', idExpiditeur);
        socketRef.current.on('nouveauMessage', () => {
            queryClient.invalidateQueries({queryKey : ['messages', id]});
        });
        return () => {
            socketRef.current?.disconnect();
        }
    },[])

    const envoyerMessage = () => {
        if(message.trim() === "") return;
        socketRef.current?.emit('envoyerMessage', {
            conversationId: id,
            text: message,
            expediteurId: idExpiditeur,
            destinataireId: idReceveur,
        });
        setMessage("");
    }
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <FlatList
                style={styles.list}
                contentContainerStyle={styles.listContent}
                data={messages}
                renderItem={({item}) => (
                    <View style={[
                        styles.bubble,
                        item.auth?.id === idExpiditeur ? styles.bubbleMine : styles.bubbleTheirs
                    ]}>
                        <Text style={styles.bubbleText}>{item.text}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
            <View style={styles.inputBar}>
                <TextInput
                    style={styles.input}
                    placeholder="Écrivez votre message"
                    placeholderTextColor="#999"
                    value={message}
                    onChangeText={setMessage}
                />
                <Pressable style={styles.sendButton} onPress={envoyerMessage}>
                    <Text style={styles.sendButtonText}>Envoyer</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    list: {
        flex: 1,
    },
    listContent: {
        padding: 12,
        gap: 8,
    },
    bubble: {
        maxWidth: '75%',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 16,
        marginBottom: 8,
    },
    bubbleMine: {
        backgroundColor: '#ff5722',
        alignSelf: 'flex-end',
        borderBottomRightRadius: 4,
    },
    bubbleTheirs: {
        backgroundColor: '#fff',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 2,
        elevation: 1,
    },
    bubbleText: {
        fontSize: 15,
        color: '#1A1A1A',
    },
    inputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    input: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 15,
        marginRight: 8,
    },
    sendButton: {
        backgroundColor: '#ff5722',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 18,
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 14,
    },
});