const express = require('express')
const busRoute = require('./routes/bus')
const cancelRoute = require('./routes/cancelReservation')
const registrationRoute = require('./routes/registration')
const reservationRoute = require('./routes/reservation')
const statusRoute = require('./routes/reservationStatus')


const server = express()

server.use(express.json())
server.use('/available', busRoute)
server.use('/cancel', cancelRoute)
server.use('/booking', reservationRoute)
server.use('/availableSeats', statusRoute)
server.use('/user', registrationRoute)
module.exports = server
