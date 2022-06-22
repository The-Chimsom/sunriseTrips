const express = require('express');
const { connectToDb, getDb } = require('./db')
const { ObjectId } = require('mongodb');
const {successResponder, errorResponder} = require('./utils/responder')
const app = express(),
    PORT = 2001;
// let bookedsit
let db
connectToDb( function (err) {
    if (!err) {
        app.listen(PORT, () => {
            console.log(`app is listening on port ${PORT}`)
        })
        db = getDb()
    }
})
app.use(express.json());

//get  available bus with passengers less than 16
app.get('/bus', async(request, response) => {
    const {origin, destination} = request.body


 const bus =  await db.collection('buses').findOne({ origin, destination })
 console.log(bus)
 if (bus.reservations.length <= 15) {
    return successResponder(response, bus)
 }
 else{
    return errorResponder(response, 404, 'bus to specified destination is currently not available')
 }
})

// register passenger
app.post('/register', async(request, response) => {
    const { firstName, lastName, gender, age, phoneNumber } = request.body
    if (!firstName || !lastName || !gender || !age || !phoneNumber) {
       return errorResponder(response, 400, 'enter in all required personal details')
    }
    const payload = { firstName, lastName, gender, age, phoneNumber };
    const result =  await db.collection('passengers').insertOne(payload)
       return successResponder(response, result)
})
// create resrvations/ book bus
app.post('/reservation',async  (request, response) => {
    const { passengerId, busId, origin, destination, phoneNumber } = request.body
    const payload = { passengerId, busId, origin, destination, phoneNumber }

    //check to see if user passed in all required details
    if (!passengerId || !busId || !origin || !destination || !phoneNumber){
    return errorResponder(response, 404, 'please pass in all required personal details')
    }
//    find and make reservations in the available bus
    const bus = await db.collection('buses').findOne( { _id: new ObjectId(busId)});
    if (bus === null) {
        return errorResponder(response, 404, 'bus not found')
    }
    if (bus.reservations.length <= 15) {
    const newReservation = await db.collection('reservations').insertOne(payload)
    const booking = await db.collection('buses').updateOne( { _id : new ObjectId(busId) },
      { $push:{ reservations : newReservation.insertedId } })
    return successResponder(response, booking, 'reservation added')
    }
    else {
        return errorResponder(response, 400, 'bus is full')
    }
})
// check number of seats left in available bus
app.get('/reservationStatus',async (request, response) => {
    const busId = request.body.busId
const bus = await db.collection('buses').findOne({ _id : new ObjectId(busId) })
console.log(busId)
console.log(bus)
if (bus !== null) {
    return successResponder(response, bus, `${16 - bus.reservations.length} seats are available in this bus`)
}
else{
    return errorResponder(response, 404, 'bus not found')
}
})

// cancel reservation/booking
app.delete('/cancelRide', async(request, response) => {
    const {passengerId, busId, reservationId} = request.body
     
    if (!passengerId || !busId || !reservationId) {
        return errorResponder(response, 404, 'enter all required details')
    }
const reservation = await db.collection('reservations').findOne({_id: new ObjectId(reservationId)})
console.log(reservation)
if (reservation !== null) {
   const cancelReservation = await db.collection('reservations').deleteOne(reservation)
   const cancelbooking = await db.collection('buses').updateOne({ _id : new ObjectId(busId) },
   { $pull :{ reservations : reservation._id } })
return successResponder(response, payload, 'booking cancelled')
}
else{
    return errorResponder(response, 404, 'could not find reservation details')
}
 })