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
cancelRide = async (request, response) => {
    const { passengerId, busId, reservationId } = request.body
    const reservation = await db
        .collection('reservations')
        .findOne({ _id: new ObjectId(reservationId) })
    console.log(reservation)
    if (reservation !== null) {
        const cancelReservation = await db
            .collection('reservations')
            .deleteOne(reservation)
        const cancelbooking = await db
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
