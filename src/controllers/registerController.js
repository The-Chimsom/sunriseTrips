const database = require('../model/db')
const {successResponder, errorResponder} = require('../utils/responder')
const route = require('../routes/registration')

 const registerUser = async (request, response) => {
    const dbConnection = await database.connectToDb()
     const { firstName, lastName, gender, age, phoneNumber } = request.body
     const payload = { firstName, lastName, gender, age, phoneNumber }
     const result = await dbConnection.collection('passengers').insertOne(payload)
     return successResponder(response, result)
 }
 module.exports = {
    registerUser
 }
