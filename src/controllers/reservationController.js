const database = require('../model/db')
const { successResponder, errorResponder } = require('../utils/responder')
const route = require('../routes/reservation')

const createReservation = async (request, response) => {
    const dbConnection = await database.connectToDb()
    const { passengerId, busId, origin, destination, phoneNumber } =
        request.body
    const payload = { passengerId, busId, origin, destination, phoneNumber }
    //    find and make reservations in the available bus
    const bus = await dbConnection
        .collection('buses')
        .findOne({ _id: new ObjectId(busId) })
    if (bus === null) {
        return errorResponder(response, 404, 'bus not found')
    }
    if (bus.reservations.length <= 15) {
        const newReservation = await dbConnection
            .collection('reservations')
            .insertOne(payload)
        const booking = await dbConnection
            .collection('buses')
            .updateOne(
                { _id: new ObjectId(busId) },
                { $push: { reservations: newReservation.insertedId } }
            )
        return successResponder(response, booking, 'reservation added')
    } else {
        return errorResponder(response, 400, 'bus is full')
    }
}
module.exports = {
    createReservation
}
