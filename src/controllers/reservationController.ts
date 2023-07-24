import { Request, Response } from "express"
import { ObjectId } from "mongodb"

const { successResponder, errorResponder } = require('../utils/responder')

export const createReservation = async (request: Request, response: Response) => {
    const mongoDbInstance = request.app.locals.mongoDbInstance
    const { passengerId, busId, origin, destination, phoneNumber } =
        request.body
    const payload = { passengerId, busId, origin, destination, phoneNumber }
    //    find and make reservations in the available bus
    const bus = await mongoDbInstance
        .collection('buses')
        .findOne({ _id: new ObjectId(busId) })
    if (bus === null) {
        return errorResponder(response, 404, 'bus not found')
    }
    if (bus.reservations.length <= 15) {
        const newReservation = await mongoDbInstance
            .collection('reservations')
            .insertOne(payload)
        const booking = await mongoDbInstance
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
