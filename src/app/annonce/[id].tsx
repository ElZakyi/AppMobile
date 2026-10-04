import { useAnnonce } from "@/store/annonce-store";
import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

export default function CarteDetails(){
    const {id} = useLocalSearchParams();
    const {annonce} = useAnnonce();
    const produit = annonce.find((item) => item.id === id);
    if(!produit){
        return(
            <Text>Annonce non trouvé !</Text>
        )
    }
    return(
        <View style={styles.annonceDetails}>
        <View>{produit.photo? (<Image source ={{ uri : produit.photo}} style={styles.photo}/>) : (<View style={styles.photo}></View>)}</View>
        <Text>Nom : {produit.name}</Text>
        <Text>Prix : {produit.prix}</Text>
        <Text>Ville : {produit.ville}</Text>
        </View>
    )
    
}
const styles = StyleSheet.create({
    photo : {
        marginRight : 40,
        width : 80,
        height : 80,
        backgroundColor : 'black',
        borderRadius : 10,
    },
    annonceDetails: {
        flex : 1,
        alignItems:'center',
        justifyContent: 'center'
    }
})