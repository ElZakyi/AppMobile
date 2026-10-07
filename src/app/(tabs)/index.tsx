import { fetchAnnonce } from '@/api/annonce';
import AnnonceCarte from '@/components/annonce-card';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { data: annonce, isLoading, error } = useQuery({
    queryKey: ['annonces'],
    queryFn: fetchAnnonce
  });

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#ff5722" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Erreur lors du chargement des données</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={annonce}
        renderItem={({ item }) => <AnnonceCarte item={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.tete}>
            <Text style={styles.text1}>Souk</Text>
            <Text style={styles.sousTitre}>Bienvenue Chez Souk</Text>
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
  tete: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  text1: {
    fontSize: 34,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  sousTitre: {
    fontSize: 15,
    color: '#888',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  errorText: {
    fontSize: 15,
    color: '#e53935',
  },
});