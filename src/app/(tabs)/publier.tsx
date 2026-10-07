import { createAnnonce } from "@/api/annonce";
import AnnonceCarte from "@/components/annonce-card";
import { Annonce } from "@/types/annonce";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function PubScreen() {
  const [name, setname] = useState("");
  const [prix, setPrix] = useState("");
  const [ville, setVille] = useState("");
  const [src, setSrc] = useState("");

  const previewAnnonce = {
    id: 'preview',
    name: name,
    prix: Number(prix),
    ville: ville,
    photo: src,
  };
  const { id, ...donneesAEnvoyer } = previewAnnonce;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (nouvelleAnnonce: Omit<Annonce, 'id'>) => createAnnonce(nouvelleAnnonce),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['annonces'] });
      router.push("/");
      setname("");
      setPrix("");
      setVille("");
      setSrc("");
      Alert.alert("Annonce a été crée avec succés !");
    },
    onError: () => {
      Alert.alert("Erreur", "Impossible de publier l'annonce");
    }
  });

  const handlePublish = () => {
    if (name.trim() === "" || prix.trim() === "" || ville.trim() === "") {
      Alert.alert("Erreur", "Champs manquant !");
      return;
    }
    if (isNaN(Number(prix))) {
      Alert.alert("Veuillez saisir un nombre valide");
      return;
    }
    mutation.mutate(donneesAEnvoyer);
  };

  const handleImagePicker = async (mode: string) => {
    let permissionResult;
    if (mode === "camera") {
      permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    } else {
      permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    }
    if (permissionResult.status !== 'granted') {
      Alert.alert("Permission requise !");
      return;
    }
    let resultat;
    if (mode === 'galerie') {
      resultat = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });
    } else {
      resultat = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }
    if (!resultat.canceled) {
      setSrc(resultat.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formBox}>
        <View style={styles.textZone}>
          <Text style={styles.labelZone}>Nom</Text>
          <TextInput style={styles.inputZone} value={name} placeholder="Ex Iphone 128 Go" onChangeText={setname} />
        </View>
        <View style={styles.textZone}>
          <Text style={styles.labelZone}>Prix</Text>
          <TextInput keyboardType="numeric" style={styles.inputZone} value={prix} placeholder="Ex 1000" onChangeText={setPrix} />
        </View>
        <View style={styles.textZone}>
          <Text style={styles.labelZone}>Ville</Text>
          <TextInput style={styles.inputZone} value={ville} placeholder="Ex Casablanca" onChangeText={setVille} />
        </View>
        <View style={styles.photoBar}>
          <Pressable style={styles.photoButton} onPress={() => handleImagePicker('galerie')}>
            <Text style={styles.photoButtonText}>Charger photo</Text>
          </Pressable>
          <Pressable style={styles.photoButton} onPress={() => handleImagePicker('camera')}>
            <Text style={styles.photoButtonText}>Prendre photo</Text>
          </Pressable>
        </View>
        <Pressable
          disabled={mutation.isPending}
          style={({ pressed }) => [styles.button, pressed && { opacity: 0.85 }]}
          onPress={handlePublish}
        >
          <Text style={styles.buttonText}>{mutation.isPending ? "Publication ..." : "Publier"}</Text>
        </Pressable>
      </View>

      <Text style={styles.apercuTitre}>Aperçu</Text>
      <View style={styles.apercuBox}>
        <AnnonceCarte item={previewAnnonce} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  formBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '88%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  textZone: {
    marginVertical: 8,
  },
  labelZone: {
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  inputZone: {
    color: '#1A1A1A',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 6,
    fontSize: 15,
  },
  photoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    marginBottom: 6,
  },
  photoButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  photoButtonText: {
    color: '#333',
    fontSize: 13,
  },
  button: {
    backgroundColor: '#ff5722',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 14,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  apercuTitre: {
    marginTop: 26,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    alignSelf: 'flex-start',
    marginLeft: '6%',
  },
  apercuBox: {
    width: '88%',
  },
});