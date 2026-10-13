import { sendPushToken } from '@/api/user';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Alert } from "react-native";
export const registerPushToken = async() =>{
    const projectId = Constants.expoConfig?.extra?.eas?.projectId;
    const reponse = await Notifications.requestPermissionsAsync();
        if(reponse.status !== 'granted'){
            Alert.alert('Permission refusée');
        }else{
            const token = await Notifications.getExpoPushTokenAsync({projectId : projectId});
            await sendPushToken(token.data);
        }  
}