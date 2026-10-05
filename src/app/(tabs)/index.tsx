import { fetchAnnonce } from '@/api/annonce';
import AnnonceCarte from '@/components/annonce-card';
import { useQuery } from '@tanstack/react-query';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const {data : annonce, isLoading, error} = useQuery({
    queryKey : ['annonces'],
    queryFn : fetchAnnonce
  });
  if (isLoading){
    return <Text>En cours de chargement ...</Text>
  }
  if(error){
    return <Text>Erreur lors du chargement des données</Text>
  }
  return (
    
    <SafeAreaView style={styles.container}>
      
      <FlatList
       data = {annonce}
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
