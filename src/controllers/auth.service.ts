import { Collection, Db, Document, Filter } from "mongodb"
import 'dotenv/config'


import jwt from 'jsonwebtoken'
const argon2 = require('argon2')

export class AuthMongoService {
    userCollection: Collection

    constructor(mongoDbInstance: Db) {
        this.userCollection = mongoDbInstance.collection('USERS')
    }

    async checkUser(email: string) {
        const user = this.userCollection.findOne({ email })
        return user
    }

    async createJWT(userId: string) {
        const token = jwt.sign({userId}, 'TOP SECRET', {
            algorithm: 'HS256',
            expiresIn: '1d',
        })
        return token
    }
    async saveCredentials(userDetails: Filter<Document>) {
        const details = await this.userCollection.insertOne(userDetails)
        const token = await this.createJWT(String(details.insertedId))
        return { userId: details.insertedId, token }
    }
    async hashpassword(password: string) {
        const hashedPassword = argon2.hash(password)
        return hashedPassword
    }
}
