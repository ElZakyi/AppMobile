import { Annonce } from "@/types/annonce";
import { User } from "@/types/user";

export async function fetchAnnonce(){
    const reponse = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/annonces`);
    if(reponse.ok === false){
        throw new Error("Erreur lors du fetch des données");
    }else{
        return reponse.json();
    }
}
export async function fetchAnnonceById(id : string){
    const reponse = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/annonces/${id}`)
    if(!reponse.ok){
        throw new Error("Impossible de trouver l'annonce");
    }
    else{
        return reponse.json();
    }
}   

export async function createAnnonce(nouvelleAnnonce : Omit<Annonce,'id'>){
    const reponse = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/annonces`, {
        method: 'POST',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(nouvelleAnnonce)
    })
    if(!reponse.ok){
        throw new Error("Impossible de creer l'annonce");
    }else {
        return reponse.json();
    }
}
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