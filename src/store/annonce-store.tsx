import { DATA } from "@/data/annonce";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AnnonceState {
    favorisIds : string[]
    toogleFavoris : (idFavoris : string) => void
}

export const useAnnonce = create<AnnonceState>()(
    persist(
    (set)=>({
    annonce : DATA,
    favorisIds : [],
    toogleFavoris : (id) => set((state)=> {
        const exist = state.favorisIds.includes(id);
        if(exist){
            return {favorisIds : state.favorisIds.filter((favorisIds) => favorisIds !== id)};
        }else {
            return {favorisIds : [...state.favorisIds,id]};
        }
    })}),
    {
        name:"annonceStorage",
        storage: createJSONStorage(()=> AsyncStorage)
    }
    ))