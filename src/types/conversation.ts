import { Message } from "./message"
import { User } from "./user"

export type Conversation = {
    id: string,
    message : Message[],
    acheteur : User,
    vendeur : User,
    createdAt : Date
}