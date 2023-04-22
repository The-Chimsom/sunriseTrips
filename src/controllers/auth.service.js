const argon2 = require('argon2')

class AuthMongoService {
    constructor (mongoDbInstance) {
        this.userCollection = mongoDbInstance.collection('USERS')
    }

    async checkUser(email) {
        const user = this.userCollection.findOne({ email})
        return user
    }
    async saveCredentials(userDetails) {
        const details = this.userCollection.insertOne(userDetails)
        return details
    }
    async hashpassword(password){
        const hashedPassword = argon2.hash(password)
        return hashedPassword
    }
}
module.exports = AuthMongoService
