import AnnonceCarte from "@/components/annonce-card";
import {useAnnonce} from "@/store/annonce-store";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function PubScreen(){
    const [name, setname] = useState("");
    const [prix, setPrix] = useState("");
    const [ville, setVille] = useState("");
    const annonce = {id:Date.now().toString(), name: name, prix:Number(prix), ville:ville};
    const {addAnnonce} = useAnnonce();
    const handlePublish = () => {
        if(name.trim() === "" || prix.trim() === "" || ville.trim() === ""){
            Alert.alert("Erreur","Champs manquant !");
            return;
        }
        if(isNaN(Number(prix))){
            Alert.alert("Veuillez saisir un namebre valide");
            return;
        }
        addAnnonce(annonce);
        Alert.alert("Succes","Votre Annonce a été publiée");
        setname("");
        setPrix("");
        setVille("");
        router.push("/")
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
                <Pressable style={({pressed})=>([styles.button, pressed&&{opacity:0.8}])} onPress={handlePublish}><Text>Publier</Text></Pressable>
            </View>
            <View >
                <AnnonceCarte item = {annonce}/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
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