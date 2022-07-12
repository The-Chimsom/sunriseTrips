const express = require('express')
const server = express()
const busRoute = require('./routes/bus')
const cancelRoute = require('./routes/cancelReservation')
const registrationRoute = require('./routes/registration')
const reservationRoute = require('./routes/reservation')
const statusRoute = require('./routes/reservationStatus')

server.use(express.json())
server.use('/available', busRoute)
server.use('/cancel', cancelRoute)
server.use('/user', registrationRoute)
server.use('/booking', reservationRoute)
server.use('/availableSeats', statusRoute)

module.exports = server
