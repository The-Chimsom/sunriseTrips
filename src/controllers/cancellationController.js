const database = require('../model/db')
const { successResponder, errorResponder } = require('../utils/responder')
// const route = require('../routes/cancelReservation')

const cancelBooking = async (request, response) => {
    const mongoDbInstance = request.app.locals.mongoDbInstance
    const { passengerId, busId, reservationId } = request.body
    const reservation = await mongoDbInstance
        .collection('reservations')
        .findOne({ _id: new ObjectId(reservationId) })
    console.log(reservation)
    if (reservation !== null) {
        const cancelReservation = await mongoDbInstance
            .collection('reservations')
            .deleteOne(reservation)
        const cancelbooking = await mongoDbInstance
            .collection('buses')
            .updateOne(
                { _id: new ObjectId(busId) },
                { $pull: { reservations: reservation._id } }
            )
        return successResponder(response, payload, 'booking cancelled')
    } else {
        return errorResponder(
            response,
            404,
            'could not find reservation details'
        )
    }
}
module.exports = {
    cancelBooking
}
