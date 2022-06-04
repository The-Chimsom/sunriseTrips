const express = require('express');
const { connectToDb, getDb } = require('./db')
const { ObjectId } = require('mongodb')
const app = express(),
 PORT = 2002;

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

app.get('/buses', (request, response) => {
    let buses = []

    db.collection('buses')
    .find({ seatsTaken: { $lt: 16 } } )
    // .sort()
    .forEach(bus => buses.push(bus))
    .then(() => {
        response.status(200).json(buses)
    })
    .catch(() => {
        response.status(500).json({error: 'could not fetch buses'})
    })
})

app.get('/bus', (request, response) => {})

app.get('/users', (request, response) => {
    let passengers = []

    db.collection('passengers')
    .find( )
    .sort()
    .forEach(passenger => passengers.push(passenger))
    .then(() => {
        response.status(200).json(passengers)
    })
    .catch( () => {
        response.status(500).json({error: 'could not fetch users'})
    })     
})

app.get('/user/:id', (request, response) => {

})

app.post('/bookSit', (request, response) => {

    db.collection('buses')
    db.collection()
})


app.put('/sit/available', (request, response) => {})


app.delete('/cancelRide', (request, response) => {})