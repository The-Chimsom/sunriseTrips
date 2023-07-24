const jwt = require('jsonwebtoken')
const argon2 = require('argon2')

class AuthMongoService {
    constructor(mongoDbInstance) {
        this.userCollection = mongoDbInstance.collection('USERS')
    }

    async checkUser(email) {
        const user = this.userCollection.findOne({ email })
        return user
    }
    async saveCredentials(userDetails) {
        const details = await this.userCollection.insertOne(userDetails)
        const token = await this.createJWT(String(details.insertedId))
        return { userId: details.insertedId, token }
    }
    async hashpassword(password) {
        const hashedPassword = argon2.hash(password)
        return hashedPassword
    }
    async createJWT(userId) {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            algorithm: process.env.JWT_ALGORITHM,
            expiresIn: '1d',
        })
        return token
    }
}
module.exports = AuthMongoService
