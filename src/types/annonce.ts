import { User } from "./user"

export type Annonce = {
  id : string,
  name : string,
  prix : number,
  ville : string,
  photo? : string,
  auth? : User
}