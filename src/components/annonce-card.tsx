import { useAnnonce } from "@/store/annonce-store";
import { Annonce } from "@/types/annonce";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function AnnonceCarte({ item }: { item: Annonce }) {
  const { favorisIds, toogleFavoris } = useAnnonce();
  const isFavoris = favorisIds.includes(item.id);

  return (
    <Pressable
      onPress={() => router.push({ pathname: '/annonce/[id]', params: { id: item.id } })}
      style={({ pressed }) => [
        styles.carte,
        { backgroundColor: pressed ? '#F0F0F0' : '#FFF' }
      ]}
    >
      {item.photo ? (
        <Image source={{ uri: item.photo }} style={styles.photo} />
      ) : (
        <View style={styles.photo} />
      )}
      <View style={styles.photoInfo}>
        <Text style={styles.nom}>{item.name}</Text>
        <Text style={styles.prix}>{item.prix} DH</Text>
        <Text style={styles.ville}>{item.ville}</Text>
      </View>
      <Pressable
        style={styles.favorisButton}
        onPress={(e) => { e.stopPropagation(); toogleFavoris(item.id); }}
      >
        <Ionicons name={isFavoris ? "heart" : "heart-outline"} size={24} color={isFavoris ? "#ff5722" : "#aaa"} />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  carte: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    marginRight: 14,
  },
  photoInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  nom: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  prix: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ff5722',
    marginBottom: 4,
  },
  ville: {
    fontSize: 13,
    color: '#888',
  },
  favorisButton: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
});