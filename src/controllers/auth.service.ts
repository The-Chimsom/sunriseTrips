import { Collection, Db, Document, Filter } from "mongodb"

const jwt = require('jsonwebtoken')
const argon2 = require('argon2')

class AuthMongoService {
    userCollection: Collection;

    constructor(mongoDbInstance: Db) {
        this.userCollection = mongoDbInstance.collection('USERS')
    }

    async checkUser(email: string) {
        const user = this.userCollection.findOne({ email })
        return user
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
    async createJWT(userId: string) {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            algorithm: process.env.JWT_ALGORITHM,
            expiresIn: '1d',
        })
        return token
    }
}
module.exports = AuthMongoService
