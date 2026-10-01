import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnnonceCarte from '../components/annonce-card';
import { Annonce } from '../types/annonce';
const DATA : Annonce[]= [
  {id : "1", name : "iPhone 13 - 128 Go", prix : 4500, ville : 'Casablanca'},
  {id : "2", name : "Canapé d'angle en cuir", prix : 3200, ville : 'Rabat'},
  {id : "3", name : "Vélo VTT Rockrider", prix : 1800, ville : 'Marrakech'}
]
export default function HomeScreen() {
  return (
    
    <SafeAreaView style={styles.container}>
      
      <FlatList
       data = {DATA}
       renderItem={({item}) => <AnnonceCarte item = {item} />}
       keyExtractor={(item) => item.id}
       ListHeaderComponent={
       <View style={styles.tete}>
        <Text style={styles.text1}> Souk </Text>
        <Text>Bienvenue Chez Souk</Text>
      </View>
      }
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
 
});
