import { DATA } from "@/data/annonce";
import { Annonce } from "@/types/annonce";
import { create } from 'zustand';


interface AnnonceState {
    annonce : Annonce[]
    favorisIds : string[]
    toogleFavoris : (idFavoris : string) => void
    addAnnonce : (nouvelleAnnonce : Annonce) => void;
}

export const useAnnonce = create<AnnonceState>((set)=>({
    annonce : DATA,
    favorisIds : [],
    addAnnonce : (nouvelleAnnonce) => set((state) => ({
        annonce : [nouvelleAnnonce, ...state.annonce]
    })),
    toogleFavoris : (id) => set((state)=> {
        const exist = state.favorisIds.includes(id);
        if(exist){
            return {favorisIds : state.favorisIds.filter((favorisIds) => favorisIds !== id)};
        }else {
            return {favorisIds : [...state.favorisIds,id]};
        }
    })
})) 