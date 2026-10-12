import { Conversation } from "./conversation"
import { User } from "./user"

export type Message = {
    id: string,
    conversation : Conversation,
    auth : User,
    text : string
    createdAt : Date
}