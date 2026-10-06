import { fetchAnnonceById } from "@/api/annonce";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

export default function CarteDetails(){
    const {id} = useLocalSearchParams();
    const {data: annonce, isLoading, isError} = useQuery({
        queryKey:['annonce' , id],
        queryFn: () => fetchAnnonceById(id as string),
    })
    if(isLoading){
        return <ActivityIndicator size="large" />
    }
    if(isError){
        return <Text>Impossible de charger l'annonce</Text>
    }
    if(!annonce){
    return <Text>Annonce non trouvée !</Text>
}
    return(
        <View style={styles.annonceDetails}>
        <View>{annonce.photo? (<Image source ={{ uri : annonce.photo}} style={styles.photo}/>) : (<View style={styles.photo}></View>)}</View>
        <Text>Nom : {annonce.name}</Text>
        <Text>Prix : {annonce.prix}</Text>
        <Text>Ville : {annonce.ville}</Text>
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