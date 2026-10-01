export const DATA : Annonce[]= [
  {id : "1", name : "iPhone 13 - 128 Go", prix : 4500, ville : 'Casablanca'},
  {id : "2", name : "Canapé d'angle en cuir", prix : 3200, ville : 'Rabat'},
  {id : "3", name : "Vélo VTT Rockrider", prix : 1800, ville : 'Marrakech'}
]
export type Annonce = {
  id : string,
  name : string,
  prix : number,
  ville : string
}