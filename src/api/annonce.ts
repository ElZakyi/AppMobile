import { useAuth } from "@/store/auth-store";
import { Annonce } from "@/types/annonce";


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
    const token = useAuth.getState().token
    const reponse = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/annonces`, {
        method: 'POST',
        headers : {'Content-Type': 'application/json', 'Authorization' : `Bearer ${token}`},
        body : JSON.stringify(nouvelleAnnonce),
    })
    if(!reponse.ok){
        throw new Error("Impossible de creer l'annonce");
    }else {
        return reponse.json();
    }
}
export async function fetchAnnonceByAuth(){
    const token = useAuth.getState().token
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/annonces/me`,{
        method:'GET',
        headers:{'Content-Type' : 'application/json', 'Authorization' : `Bearer ${token}`}
    })
    if(!response.ok){
        throw new Error("Impossible de trouver les annonces liées a l'autheur");
    }else{
        return response.json();
    }
}
export async function deleteAnnonce(idAnnonce: string){
    const token = useAuth.getState().token
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/annonces/${idAnnonce}`,{
        method: 'DELETE',
        headers: {'Content-Type' : 'application/json', 'Authorization' : `Bearer ${token}`}
    })
    if(!response.ok){
        throw new Error("Impossible de supprimer l'annonce");
    }else{
        return {"message" : "Annonce supprimée avec succés !"};
    }
}

