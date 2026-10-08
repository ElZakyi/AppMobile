import { fetchAnnonceByAuth } from "@/api/annonce";
import AnnonceCarte from "@/components/annonce-card";
import { useAuth } from "@/store/auth-store";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfilScreen(){
    const {data : annonces , isLoading, error} = useQuery({
        queryKey:['auth-annonces'],
        queryFn : fetchAnnonceByAuth
    })

    const logout = async() => {
        await useAuth.getState().logout();
        router.replace("/login");
    }

    if(isLoading){
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#ff5722" />
            </View>
        );
    }
    if(error){
        Alert.alert("Impossible de charger les données !");
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titre}>Mon profil</Text>

            <Pressable
                style={({ pressed }) => [styles.logoutButton, pressed && { opacity: 0.85 }]}
                onPress={logout}
            >
                <Text style={styles.logoutText}>Se déconnecter</Text>
            </Pressable>

            <Text style={styles.sousTitre}>Mes annonces</Text>

            <FlatList
                data={annonces}
                renderItem={({ item }) => <AnnonceCarte item={item} showDeleteButton />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Vous n'avez publié aucune annonce</Text>
                    </View>
                }
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
    },
    titre: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1A1A1A',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    logoutButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ff5722',
        borderRadius: 10,
        paddingVertical: 10,
        marginHorizontal: 20,
        marginTop: 14,
        alignItems: 'center',
    },
    logoutText: {
        color: '#ff5722',
        fontWeight: '700',
        fontSize: 15,
    },
    sousTitre: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        paddingHorizontal: 20,
        marginTop: 26,
        marginBottom: 12,
    },
    listContent: {
        paddingBottom: 20,
    },
    emptyContainer: {
        marginTop: 80,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 15,
        color: '#888',
        fontStyle: 'italic',
    },
});