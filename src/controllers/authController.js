const database = require('../model/db')
const { successResponder, errorResponder } = require('../utils/responder')
const AuthMongoService = require('./auth.service')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const registerUser = async (request, response) => {
    const mongoDbInstance = request.app.locals.mongoDbInstance
    const { firstName, lastName, gender, age, phoneNumber } = request.body
    const passenger = await mongoDbInstance
        .collection('passengers')
        .findOne({ phoneNumber })
    if (passenger === null) {
        const payload = { firstName, lastName, gender, age, phoneNumber }
        const result = await mongoDbInstance
            .collection('passengers')
            .insertOne(payload)
        return successResponder(response, result)
    } else {
        errorResponder(response, 401, 'passenger already exists')
    }
}
const signUp = async (request, response) => {
    const mongoDbInstance = request.app.locals.mongoDbInstance
    const authMongoService = new AuthMongoService(mongoDbInstance)
    const payload = { ...request.body}
    
    const hashedPassword = await authMongoService.hashpassword(payload.password)
    const userCheck = await authMongoService.checkUser(payload.email)
    // const emailAddress = await mongoDbInstance
    //     .collection('users')
    //     .findOne({ email })

    if (userCheck) {
        return errorResponder(
            response,
            400,
            'user with this email already exists'
        )
    }
    // const user = await mongoDbInstance
    //     .collection('users')
    //     .insertOne({ firstName, lastName, email, password: hash, phoneNumber })

    const user = await authMongoService.saveCredentials({...payload});

    const userId = String(user.insertedId)
    const token = jwt.sign({ userId }, 'top_secret-20', {
        algorithm: 'HS256',
        expiresIn: '2h',
    })
    return successResponder(response, { userId, token })
}

const login = async (request, response) => {
    const dbConnection = request.app.locals.mongoDbInstance
    const { email, password } = request.body
    const checkUser = await dbConnection.collection('users').findOne({ email })
    if (!checkUser) {
        return errorResponder(response, 404, 'user does not exists')
    }
    const userId = String(user.insertedId)
    const token = jwt.sign({ userId }, process.env.ACCESS_TOP_TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: '2h',
    })
    return successResponder(response, { userId, token })
}

const logout = async (request, response) =>{
    
}
module.exports = {
    registerUser,
    signUp,
    login,
    logout
}