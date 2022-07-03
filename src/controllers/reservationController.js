const { connectToDb, getDb } = require('../model/db')
const { successResponder, errorResponder } = require('../utils/responder')

let db
connectToDb(function (err) {
    if (!err) {
        app.listen(PORT, () => {
            console.log(`app is listening on port ${PORT}`)
        })
        db = getDb()
    }
})
const createReservation = async (request, response) => {
    const { passengerId, busId, origin, destination, phoneNumber } =
        request.body
    const payload = { passengerId, busId, origin, destination, phoneNumber }
    //    find and make reservations in the available bus
    const bus = await db
        .collection('buses')
        .findOne({ _id: new ObjectId(busId) })
    if (bus === null) {
        return errorResponder(response, 404, 'bus not found')
    }
    if (bus.reservations.length <= 15) {
        const newReservation = await db
            .collection('reservations')
            .insertOne(payload)
        const booking = await db
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
