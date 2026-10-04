import { useAnnonce } from "@/store/annonce-store";
import { Annonce } from "@/types/annonce";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function AnnonceCarte( {item} : {item : Annonce}){
  const {favorisIds, toogleFavoris} = useAnnonce();
  const isFavoris = favorisIds.includes(item.id);
    return (
      <Pressable onPress={() => router.push({pathname:'/annonce/[id]', params:{id : item.id}})}
                 style = {({pressed}) => [
                  styles.carte ,
                  {backgroundColor : pressed? '#e0e0e0' : '#FFF'}
                 ]}>
            {item.photo?(
              <Image source={{uri:item.photo}} style={styles.photo}/>
            ):
            (<View style={styles.photo}></View>)
            }           
            <View style={styles.photoInfo}>
                <Text>{item.name}</Text>
                <Text>{item.prix} DH</Text>
                <Text>{item.ville}</Text>
            </View>
            <Pressable style={styles.favorisButton} onPress={(e)=>{e.stopPropagation();toogleFavoris(item.id); }}>
              <Ionicons name={isFavoris? "heart" : "heart-outline"} size={24} color={isFavoris? "red" : "gray"} />
            </Pressable>
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
  },
  favorisButton : {
    position:'absolute',
    right : 15
  }
})