import { fetchAnnonceById } from "@/api/annonce";
import { createConversation } from "@/api/conversation";
import { useAuth } from "@/store/auth-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
export default function CarteDetails() {
  const { id } = useLocalSearchParams();
  const idUserActif = useAuth().userId;
  const { data: annonce, isLoading, isError } = useQuery({
    queryKey: ['annonce', id],
    queryFn: () => fetchAnnonceById(id as string),
  });
  const mutation = useMutation({
    mutationFn: () => createConversation(annonce.author.id as string),
    onSuccess : ()=>{
      Alert.alert("Vous debutez la conversation avec succés");
      router.push("/(tabs)/conversations");
    },
    onError : (error) => {
      console.log(error);
      Alert.alert("Impossible de debuter une conversation");
    }
  })
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#ff5722" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Impossible de charger l'annonce</Text>
      </View>
    );
  }

  if (!annonce) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Annonce non trouvée !</Text>
      </View>
    );
  }

  return (
    <View style={styles.annonceDetails}>
      {annonce.photo ? (
        <Image source={{ uri: annonce.photo }} style={styles.photo} />
      ) : (
        <View style={styles.photo} />
      )}
      <Text style={styles.nom}>{annonce.name}</Text>
      <Text style={styles.prix}>{annonce.prix} DH</Text>
      <Text style={styles.ville}>{annonce.ville}</Text>
      {idUserActif !== annonce.author.id && <Pressable onPress={() => mutation.mutate()}><Text>Debuter une conversation</Text></Pressable>}
    </View>
  );
}

const styles = StyleSheet.create({
  annonceDetails: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  photo: {
    width: 220,
    height: 220,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    marginBottom: 24,
  },
  nom: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  prix: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ff5722',
    marginBottom: 8,
  },
  ville: {
    fontSize: 16,
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