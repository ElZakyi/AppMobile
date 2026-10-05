export async function fetchAnnonce(){
    const reponse = await fetch('http://192.168.1.37:3000/annonces')
    if(reponse.ok === false){
        throw new Error("Erreur lors du fetch des données");
    }else{
        return reponse.json();
    }
}