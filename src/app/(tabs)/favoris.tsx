import { fetchAnnonce } from "@/api/annonce";
import AnnonceCarte from "@/components/annonce-card";
import { useAnnonce } from "@/store/annonce-store";
import { Annonce } from "@/types/annonce";
import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // 👈 1. Importez SafeAreaView

export default function FavorisScreen(){
    const { favorisIds } = useAnnonce();
    const {data : annonce} = useQuery({
        queryKey:['annonces'],
        queryFn : fetchAnnonce,
    });
    const filtredFavorisAnnonce = annonce?.filter((item : Annonce) => favorisIds.includes(item.id)) ?? [];

    return (
        // 2. Utilisez SafeAreaView à la place de View pour respecter les bordures de l'écran
        <SafeAreaView style={styles.container} edges={['top']}>
            <FlatList
                style={styles.list}
                data={filtredFavorisAnnonce}
                renderItem={({item}) => <AnnonceCarte item={item}/>}
                keyExtractor={(item) => item.id}
                // 3. Optionnel : un petit espace en haut de la liste elle-même si besoin
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Aucun favori pour l'instant</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    list: {
        flex: 1,
    },
    listContent: {
        paddingTop: 10, // 👈 Rajoute un petit espace au-dessus du premier élément
    },
    emptyContainer: {
        flex: 1,
        marginTop: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
        fontStyle: 'italic',
    },
});