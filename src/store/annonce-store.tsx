import { DATA } from "@/data/annonce";
import { Annonce } from "@/types/annonce";
import {create} from 'zustand';


interface AnnonceState {
    annonce : Annonce[]
    addAnnonce : (nouvelleAnnonce : Annonce) => void;
}

export const useAnnonce = create<AnnonceState>((set)=>({
    annonce : DATA,
    addAnnonce : (nouvelleAnnonce) => set((state) => ({
        annonce : [nouvelleAnnonce, ...state.annonce]
    }))
})) 