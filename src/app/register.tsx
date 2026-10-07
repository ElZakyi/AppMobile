import { inscription } from "@/api/auth";
import { RegisterUser } from "@/types/registerUser";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const userRegisterDTO = {
        name: name,
        email: email,
        password: password,
    }
    const mutation = useMutation({
        mutationFn: (userRegister: RegisterUser) => inscription(userRegister),
        onSuccess: () => {
            Alert.alert("Compte crée avec succés !");
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            router.push("/login");
        },
        onError: () => {
            Alert.alert("Impossible de créer de compte !");
        }

    })
    const register = () => {
        if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
            Alert.alert("Erreur", "Champs manquant !");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Mot de passe incompatible");
            return;
        }
        mutation.mutate(userRegisterDTO);
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titre}>Créer un compte</Text>
            <Text style={styles.sousTitre}>Rejoignez Souk en quelques secondes</Text>

            <Text style={styles.label}>Nom</Text>
            <TextInput
                style={styles.input}
                placeholder="ex Sami"
                placeholderTextColor="#aaa"
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="ex test@test.com"
                placeholderTextColor="#aaa"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />

            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="••••••••"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
            />

            <Text style={styles.label}>Confirmez votre mot de passe</Text>
            <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="••••••••"
                placeholderTextColor="#aaa"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <Pressable
                disabled={mutation.isPending}
                style={({ pressed }) => [styles.button, pressed && { opacity: 0.85 }]}
                onPress={register}
            >
                <Text style={styles.buttonText}>
                    {mutation.isPending ? "Création..." : "S'inscrire"}
                </Text>
            </Pressable>

            <Pressable onPress={() => router.push("/login")}>
                <Text style={styles.lien}>Déjà inscrit ? <Text style={styles.lienFort}>Se connecter</Text></Text>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        justifyContent: 'center',
        paddingHorizontal: 28,
    },
    titre: {
        fontSize: 30,
        fontWeight: '800',
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 6,
    },
    sousTitre: {
        fontSize: 15,
        color: '#888',
        textAlign: 'center',
        marginBottom: 30,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 6,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
        color: '#1A1A1A',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#ff5722',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
    lien: {
        textAlign: 'center',
        color: '#888',
        fontSize: 14,
        marginTop: 20,
    },
    lienFort: {
        color: '#ff5722',
        fontWeight: '700',
    },
});