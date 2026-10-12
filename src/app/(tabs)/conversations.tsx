import { fetchConversation } from "@/api/conversation";
import { useAuth } from "@/store/auth-store";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ConversationScreen(){
    const userId = useAuth.getState().userId;
    const {data : conversations, isLoading, isError} = useQuery({
        queryKey: ['conversations'],
        queryFn: fetchConversation
    })

    if(isLoading){
        return <Text style={styles.info}>Chargement des conversations ...</Text>;
    }
    if(isError){
        return <Text style={styles.info}>Impossible de charger les conversations</Text>;
    }

    return(
    <SafeAreaView style={styles.container}>
        <FlatList
            data={conversations}
            contentContainerStyle={styles.listContent}
            renderItem={({item}) => {
                const autrePersonne = item.acheteur.id !== userId ? item.acheteur : item.vendeur;
                return (
                    <Pressable
                        style={({pressed}) => [styles.card, pressed && {opacity: 0.8}]}
                        onPress={() => router.push({ pathname: '/conversation/[id]', params: { id: item.id } })}
                    >
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{autrePersonne.name?.[0]?.toUpperCase() ?? "?"}</Text>
                        </View>
                        <Text style={styles.nom}>{autrePersonne.name}</Text>
                    </Pressable>
                );
            }}
            keyExtractor={(item) => item.id}
        />
    </SafeAreaView>
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    listContent: {
        padding: 12,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 14,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 3,
        elevation: 1,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#ff5722',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    avatarText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 18,
    },
    nom: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1A1A',
    },
    info: {
        marginTop: 40,
        textAlign: 'center',
        color: '#888',
    },
});