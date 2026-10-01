import { StyleSheet, Text, View } from "react-native";
import { Annonce } from "../types/annonce";

export default function AnnonceCarte( {item} : {item : Annonce}){
    return (
        <View style={styles.carte}>
            <View style={styles.photo}></View>
            <View style={styles.photoInfo}>
                <Text>{item.name}</Text>
                <Text>{item.prix} DH</Text>
                <Text>{item.ville}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
     carte : {
    flexDirection : 'row',
    marginLeft : 20,
    marginTop: 10
  },
  photo : {
    marginRight : 40,
    width : 80,
    height : 80,
    backgroundColor : 'black',
    borderRadius : 10,
  },
  photoInfo : {
    marginTop : 15
  }
})