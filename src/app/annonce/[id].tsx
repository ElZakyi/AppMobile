import { DATA } from "@/data/annonce";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function CarteDetails(){
    const {id} = useLocalSearchParams();
    const produit = DATA.find((item) => item.id === id);
    if(!produit){
        return(
            <Text>Annonce non trouvé !</Text>
        )
    }
    return(
        <View>
        <Text>{produit.name}</Text>
        <Text>{produit.prix}</Text>
        <Text>{produit.ville}</Text>
        </View>
    )
    
}