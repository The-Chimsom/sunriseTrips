const { ObjectId } = require('mongodb')
const database = require('../model/db')
const { successResponder, errorResponder } = require('../utils/responder')

const busStatus = async (request, response) => {
    const db = await database.connectToDb()
    const busId = request.body.busId
    const bus = await db
        .collection('buses')
        .findOne({ _id: new ObjectId(busId) })
    console.log(busId)
    console.log(bus)
    if (bus !== null) {
        return successResponder(
            response,
            bus,
            `${16 - bus.reservations.length} seats are available in this bus`
        )
    } else {
        return errorResponder(response, 404, 'bus not found')
    }
}
module.exports = {
    busStatus
}
