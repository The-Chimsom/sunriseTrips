const express = require('express')
const { connectToDb, getDb } = require('./db')
const { ObjectId } = require('mongodb')
const { successResponder, errorResponder } = require('./utils/responder')
const { requiredDetails } = require('./middlewares/reservationMiddleware')
const { busValidation } = require('./middlewares/busMiddleware')
const { regDetails } = require('./middlewares/registrationMiddleware')
const { passengerDetails } = require('./middlewares/cancellationMiddleware')
const app = express(),
    PORT = 2001
// let bookedsit
let db
connectToDb(function (err) {
    if (!err) {
        app.listen(PORT, () => {
            console.log(`app is listening on port ${PORT}`)
        })
        db = getDb()
    }
})
app.use(express.json())

//get  available bus with passengers less than 16
app.get('/bus', busValidation, async (request, response) => {
    const { origin, destination } = request.body
    const bus = await db.collection('buses').findOne({ origin, destination })
    if (!bus || bus.reservations.length >= 15) {
        errorResponder(
            response,
            404,
            'bus to specified destination is currently not available'
        )
    }
    console.log(bus)
    if (bus.reservations.length <= 15) {
        return successResponder(response, bus)
    }
})

// register passenger
app.post('/register', regDetails, async (request, response) => {
    const { firstName, lastName, gender, age, phoneNumber } = request.body
    const payload = { firstName, lastName, gender, age, phoneNumber }
    const result = await db.collection('passengers').insertOne(payload)
    return successResponder(response, result)
})

// create resrvations/ book bus
app.post('/reservation', requiredDetails, async (request, response) => {
    const { passengerId, busId, origin, destination, phoneNumber } =
        request.body
    const payload = { passengerId, busId, origin, destination, phoneNumber }
    console.log(payload)
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
})
// check number of seats left in available bus
app.get('/reservationStatus', async (request, response) => {
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
})

// cancel reservation/booking
app.delete('/cancelRide', passengerDetails, async (request, response) => {
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
})
