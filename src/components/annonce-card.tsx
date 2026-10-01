import { Pressable, StyleSheet, Text, View } from "react-native";
import { Annonce } from "../types/annonce";

export default function AnnonceCarte( {item} : {item : Annonce}){
    return (
      <Pressable onPress={() => console.log(`Le nom du produit :  ${item.name} , son prix est : ${item.prix} , ville : ${item.ville} `)}
                 style = {({pressed}) => [
                  styles.carte ,
                  {backgroundColor : pressed? '#e0e0e0' : '#FFF'}
                 ]}>
            <View style={styles.photo}></View>
            <View style={styles.photoInfo}>
                <Text>{item.name}</Text>
                <Text>{item.prix} DH</Text>
                <Text>{item.ville}</Text>
            </View>
      </Pressable>
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