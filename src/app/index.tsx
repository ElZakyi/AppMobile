import {  StyleSheet, Text, View, FlatList, ListRenderItem} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
type Annonce = {
  id : string,
  name : string,
  prix : number,
  ville : string
}
const DATA : Annonce[]= [
  {id : "1", name : "iPhone 13 - 128 Go", prix : 4500, ville : 'Casablanca'},
  {id : "2", name : "Canapé d'angle en cuir", prix : 3200, ville : 'Rabat'},
  {id : "3", name : "Vélo VTT Rockrider", prix : 1800, ville : 'Marrakech'}
]
export default function HomeScreen() {
  const renderItem : ListRenderItem<Annonce> = ({item}) => (
    <View style={styles.carte}>
      <View style={styles.photo}></View>
        <View style={styles.photoInfo}>
          <Text>{item.name}</Text>
          <Text>{item.prix} DH</Text>
          <Text>{item.ville}</Text>
        </View> 
    </View>
  )
  return (
    
    <SafeAreaView style={styles.container}>
      <View style={styles.tete}>
        <Text style={styles.text1}> Souk </Text>
        <Text>Bienvenue Chez Souk</Text>
      </View>
      <FlatList
       data = {DATA}
       renderItem={renderItem}
       keyExtractor={(item) => item.id}
      />
    </SafeAreaView>   
  );
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor: '#F5F5F5',
  },
  tete : {
    alignItems: 'center',
    marginTop : 40,
    marginBottom : 50
  },
  text1 : {
    fontSize : 32,
    fontWeight : 'bold',
    marginBottom : 20
  },
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
});
