import { Ionicons } from '@expo/vector-icons';
import { Tabs } from "expo-router";
export default function TabLayout() {
  return (
    <Tabs screenOptions={{tabBarActiveTintColor: '#FF5733', tabBarInactiveTintColor : 'grey', headerShown:false}}>
      <Tabs.Screen name="index" options={{title: "Acceuil" , tabBarIcon:({color,size})=>(<Ionicons name="home-outline" color={color} size={size}/>)}}  />
      <Tabs.Screen name="favoris" options={{title:"Favoris", tabBarIcon:({color,size})=>(<Ionicons name="heart-outline" color={color} size={size}/>)}} />
      <Tabs.Screen name="publier" options={{title:"Publier", tabBarIcon:({color,size})=>(<Ionicons name="add-circle-outline" color={color} size={size}/>)}} />
      <Tabs.Screen name="profil" options={{title:"Profile", tabBarIcon:({color,size})=>(<Ionicons name="person-outline" color={color} size={size}/>)}} />
    </Tabs>
  );
}
