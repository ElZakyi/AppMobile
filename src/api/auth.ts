import { RegisterUser } from "@/types/registerUser";
import { User } from "@/types/user";
export async function connexion(user : User){
    const reponse = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/login`,{
        method: 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(user)
    })
    if(!reponse.ok){
        throw new Error("Email ou mot de passe incorrect !");
    }
    return reponse.json();
}
export async function inscription(userRegister : RegisterUser){
    const response =  await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/register`,{
        method : 'POST',
        headers : {'Content-type': 'application/json'},
        body : JSON.stringify(userRegister)
    })
    if(!response.ok){
        throw new Error("Impossible de créer de compte");
    }else{
        return response.json();
    }
}