import { createAnnonce } from "@/api/annonce";
import AnnonceCarte from "@/components/annonce-card";
import { Annonce } from "@/types/annonce";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
export default function PubScreen(){
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
    const {id, ...donneesAEnvoyer} = previewAnnonce;
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (nouvelleAnnonce :Omit<Annonce, 'id'> ) => createAnnonce(nouvelleAnnonce),
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey: ['annonces']});
            router.push("/");
            setname("");
            setPrix("");
            setVille("");
            setSrc("");
            Alert.alert("Annonce a été crée avec succés !");
        },
        onError : ()=>{
            Alert.alert("Erreur","Impossible de publier l'annonce");
        }
    })
    const handlePublish = () => {
        if(name.trim() === "" || prix.trim() === "" || ville.trim() === ""){
            Alert.alert("Erreur","Champs manquant !");
            return;
        }
        if(isNaN(Number(prix))){
            Alert.alert("Veuillez saisir un namebre valide");
            return;
        }
        mutation.mutate(donneesAEnvoyer);
        
    }
    const handleImagePicker = async(mode : string) => {
        let permissionResult;
        if(mode === "camera"){
             permissionResult = await ImagePicker.requestCameraPermissionsAsync(); 
        }else{
             permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        }
        if(permissionResult.status !== 'granted'){
            Alert.alert("Permission requise !");
            return;
        }
        let resultat;
        if(mode === 'galerie'){
              resultat = await ImagePicker.launchImageLibraryAsync({
                mediaTypes:['images'],
                allowsEditing: true,
                aspect: [4,3],
                quality: 1
            });
        }else {
                resultat = await ImagePicker.launchCameraAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        }
        if(!resultat.canceled){
            setSrc(resultat.assets[0].uri);
        }
    }
    return (
        <View style = {styles.container}>
            <View style={styles.formBox}>
                <View style = {styles.textZone}>
                    <Text >name: </Text>
                    <TextInput style={styles.inputZone} value={name} placeholder="Ex Iphone 128 Go" onChangeText={setname}/>
                </View>
                <View style = {styles.textZone}>
                    <Text style={styles.labelZone}>Prix: </Text>
                    <TextInput keyboardType = "numeric" style={styles.inputZone} value={prix} placeholder="Ex 1000" onChangeText={setPrix}/>
                </View>
                <View style = {styles.textZone}>
                    <Text >Ville: </Text>
                    <TextInput style={styles.inputZone} value={ville} placeholder="Ex Casablanca" onChangeText={setVille}/>
                </View>
                <View style={styles.buttonBar}>
                <Pressable onPress={()=>handleImagePicker('galerie')}><Text>charger photo</Text></Pressable>
                <Pressable onPress={()=>handleImagePicker('camera')}><Text>prendre photo</Text></Pressable>
                <Pressable disabled = {mutation.isPending} style={({pressed})=>( mutation.isPending? undefined : styles.button)} onPress={handlePublish}><Text>{mutation.isPending? "Publication ..." : "publier"}</Text></Pressable>
                </View>
            </View>
            <View >
                <AnnonceCarte item = {previewAnnonce}/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    buttonBar:{
        flex: 1,
        flexDirection: 'row'
    },
    container:{
        flex : 1,
        justifyContent: 'center',
        alignItems:'center',
    },
    formBox : {
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'grey',
        borderRadius: 10,
        height:'25%',
        width:'85%',
        
    },
    textZone : {
        flex:1,
        flexDirection: 'row',
        alignItems:'center',
       
    },
    labelZone : {
        marginLeft:-50,
    },
    inputZone : {
        color: '#ddd9d9'
    },
    button: {
        backgroundColor: '#ff5722', // Une belle couleur voyante pour l'action principale
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    infos:{
        paddingTop:50
    }
})