const database = require('../model/db')
const { successResponder, errorResponder } = require('../utils/responder')
const route = require('../routes/bus')

const getAvailableBus = async (request, response) => {
    try {
        const dbConnection = await database.connectToDb()
    const { origin, destination } = request.body
    const bus = await dbConnection.collection('buses').findOne({ origin, destination })
    if (!bus || bus.reservations.length >= 15) {
        errorResponder(
            response,
            404,
            'bus to specified destination is currently not available'
        )
    }
    console.log(bus)
    if (bus.reservations.length <= 15) {
        return successResponder(response, bus, 'bus accessed')
    }
}
    catch (error){
console.log(error)
    }
}
module.exports = {
    getAvailableBus
}
