import { fetchAnnonce } from "@/api/annonce";
import AnnonceCarte from "@/components/annonce-card";
import { useAnnonce } from "@/store/annonce-store";
import { Annonce } from "@/types/annonce";
import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FavorisScreen() {
  const { favorisIds } = useAnnonce();
  const { data: annonce } = useQuery({
    queryKey: ['annonces'],
    queryFn: fetchAnnonce,
  });
  const filtredFavorisAnnonce = annonce?.filter((item: Annonce) => favorisIds.includes(item.id)) ?? [];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.titre}>Mes favoris</Text>
      <FlatList
        style={styles.list}
        data={filtredFavorisAnnonce}
        renderItem={({ item }) => <AnnonceCarte item={item} />}
        keyExtractor={(item) => item.id}
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
    backgroundColor: '#F8F9FA',
  },
  titre: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A1A',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingTop: 4,
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
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});