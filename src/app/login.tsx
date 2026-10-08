import { connexion } from "@/api/auth";
import { useAuth } from "@/store/auth-store";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const loginUserDTO = {email : email, password:password};
    const mutation = useMutation({
        mutationFn : (loginUserDTO : User) => connexion(loginUserDTO),
        onSuccess : async(data) => {
            const token = data.access_token;
            if(token){
                await useAuth.getState().login(token);
            }
            setEmail("");
            setPassword("");
            router.push("/");
        },
        onError : () => {
            Alert.alert("Erreur", "Impossible de se connecter");
        }
    })
    const login = () => {
        if (email.trim() === "" || password.trim() === "") {
            Alert.alert("Erreur", "Champs manquant !");
            return;
        }
        mutation.mutate(loginUserDTO);

    }
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.titre}>Souk</Text>
            <Text style={styles.sousTitre}>Connectez-vous à votre compte</Text>

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="exemple@mail.com"
                placeholderTextColor="#aaa"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={setEmail}
                value={email}
            />

            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="••••••••"
                placeholderTextColor="#aaa"
                onChangeText={setPassword}
                value={password}
            />

            <Pressable
                disabled={mutation.isPending}
                style={({ pressed }) => [styles.button, pressed && { opacity: 0.85 }]}
                onPress={login}
            >
                <Text style={styles.buttonText}>
                    {mutation.isPending ? "Connexion..." : "Se connecter"}
                </Text>
            </Pressable>
            <Pressable onPress={() => router.push("/register")}>
                <Text style={styles.lien}>Pas encore de compte ? <Text style={styles.lienFort}>S'inscrire</Text></Text>
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
        fontSize: 34,
        fontWeight: '800',
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 6,
    },
    sousTitre: {
        fontSize: 15,
        color: '#888',
        textAlign: 'center',
        marginBottom: 36,
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
        marginBottom: 18,
    },
    button: {
        backgroundColor: '#ff5722',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
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