const {connectToDb, getDb} = require('../model/db')
const {successResponder, errorResponder} = require('../utils/responder')

let db
connectToDb(function (err) {
    if (!err) {
        app.listen(PORT, () => {
            console.log(`app is listening on port ${PORT}`)
        })
        db = getDb()
    }
})
 const registerUser = async (request, response) => {
     const { firstName, lastName, gender, age, phoneNumber } = request.body
     const payload = { firstName, lastName, gender, age, phoneNumber }
     const result = await db.collection('passengers').insertOne(payload)
     return successResponder(response, result)
 }
 module.exports = {
    registerUser
 }
