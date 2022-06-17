const express = require('express');
const { connectToDb, getDb } = require('./db')
const { ObjectId } = require('mongodb');
const app = express(),
    PORT = 2001;

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

app.use(express.json());

//get  available bus with passengers less than 16
app.get('/bus', async(request, response) => {
    const {origin, destination} = request.body
    const payload = {origin, destination}

 const bus =  await db.collection('buses').findOne({ origin: origin, destination: destination })
 console.log(bus)
 if (bus.reservations.length <= 15) {
     response.json(bus)
 }
 else{
     response.json("bus to specified destination is currently not available" )
 }
})

// register passenger
app.post('/register', async(request, response) => {
    const { firstName, lastName, gender, age, phoneNumber } = request.body
    if (!firstName || !lastName || !gender || !age || !phoneNumber) {
        response.status(400).json({
            error: true,
            description: 'please enter all required personal details'
        })
    }
   
   
    const payload = { firstName, lastName, gender, age, phoneNumber };
    const result =  await db.collection('passengers').insertOne(payload)
    console.log(result)
       response.json(result) 
    

})
// create resrvations/ book bus
app.post('/reservation',async  (request, response) => {
    const { passengerId, busId, origin, destination, phoneNumber } = request.body
    const payload = { passengerId, busId, origin, destination, phoneNumber }

    //check to see if user passed in all required details
    if (!passengerId || !busId || !origin || !destination || !phoneNumber) {
        response.status(400).json({
            error: true,
            description: 'please enter all required details'
        })
    }
//    find and make reservations in the available bus
    const bus = await db.collection('buses').findOne( { _id: new ObjectId(busId)});
    if (bus === null) {
        response.status(404).json(
            {
                err: true,
                description: 'bus not found'
            }
        )
        return
    }
    if (bus.reservations.length <= 15) {
    const newReservation = await db.collection('reservations').insertOne(payload)
    const booking = await db.collection('buses').updateOne( { _id : new ObjectId(busId) },
      { $push:{ reservations : newReservation.insertedId } })
    response.json({
        error: false,
        description: 'reservation added'
    })  
    
    }
    else {
        response.status(400).json({
            error: true,
            description: "bus is full"

        })
    }
    
})
// check number of seats left in available bus
app.get('/reservationStatus',async (request, response) => {
    const busId = request.body.busId
const bus = await db.collection('buses').findOne({ _id : new ObjectId(busId) })
console.log(busId)
console.log(bus)
if (bus !== null) {
    response.json(`${16 - bus.reservations.length} seats are available in this bus`)
}
else{
    response.status(400).json('bus not found')
}
})

// cancel reservation/booking
app.delete('/cancelRide', async(request, response) => {
    const {passengerId, busId, reservationId} = request.body
     
    if (!passengerId || !busId || !reservationId) {
        response.status(400).json({
            error: true,
            description: 'please enter all required details'
        })
        return;
    }
const reservation = await db.collection('reservations').findOne({_id: new ObjectId(reservationId)})
console.log(reservation)
if (reservation !== null) {
   const cancelReservation = await db.collection('reservations').deleteOne(reservation)
   const cancelbooking = await db.collection('buses').updateOne({ _id : new ObjectId(busId) },
   { $pull :{ reservations : reservation._id } })
   response.json({
    error: false,
    description: 'booking cancelled'
   })
}
else{
    response.status(404).json({
        error: true,
        description:'could not find reservation details'
    })
}
 })