import { useLocalSearchParams } from "expo-router";

export default function CarteDetails(){
    const {id} = useLocalSearchParams();
    return (
        console.log(`c'est un item de id : ${id}`)
    )
}