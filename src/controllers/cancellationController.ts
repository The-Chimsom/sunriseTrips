import { Request, Response } from "express"
import { ObjectId } from "mongodb"
const { successResponder, errorResponder } = require('../utils/responder')

export const cancelBooking = async (request: Request, response: Response) => {
    const mongoDbInstance = request.app.locals.mongoDbInstance
    const { busId, reservationId } = request.body
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
        return successResponder(response, cancelbooking, 'booking cancelled')
    } else {
        return errorResponder(
            response,
            404,
            'could not find reservation details'
        )
    }
}

