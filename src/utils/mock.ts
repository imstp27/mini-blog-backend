import { Cards } from "../cards/models/cards.model"
import { InputCards } from "../cards/dto/cards.input"
import { UserAuth, UserRO } from "../users/dto/users.reponse"
import { ObjectID } from "mongodb"
import { InputUser } from "../users/dto/users.input"
import { Users } from "../users/models/users.model"

export const _id = "507f1f77bcf86cd799439011"

export const inputUser = new InputUser("username", "password")
inputUser.name = "name"
inputUser.image = "image"

export const userAuth = new UserAuth()
userAuth._id = _id
userAuth.username = inputUser.username
userAuth.name = inputUser.name
userAuth.image = inputUser.image
userAuth.accessToken = "token"
userAuth.expiresIn = 3600


export const userRO = new UserRO()
userRO._id = _id
userRO.username = "username"
userRO.name = "name"
userRO.image = "image"

export const user = new Users()
user._id = new ObjectID(_id)
user.username = inputUser.username
user.name = inputUser.name
user.image = inputUser.image

export const confidential: { accessToken: string; expiresIn: number; } = {
    accessToken: "token",
    expiresIn: 3600
}

export const inputCard = new InputCards()
inputCard.name = 'name'
inputCard.status = 'status'
inputCard.content = 'content'
inputCard.category = 'category'

export const card = new Cards()
card._id = new ObjectID(_id)
card.name = inputCard.name
card.status = inputCard.status
card.content = inputCard.content
card.category = inputCard.category
card.author = new ObjectID(_id)