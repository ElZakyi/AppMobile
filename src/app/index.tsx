import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnnonceCarte from '../components/annonce-card';
import { DATA } from '../types/annonce';

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
