import express from "express"
import { busRouter } from "./routes/bus"
import { cancelReservationRouter } from "./routes/cancelReservation"
import { registrationRouter } from "./routes/registration"
import { reservarionStatusRouter } from "./routes/reservationStatus"
import { reservationRouter } from "./routes/reservation"



const server = express()

server.use(express.json())
server.use('/available', busRouter)
server.use('/cancel', cancelReservationRouter)
server.use('/user', registrationRouter)
server.use('/booking', reservationRouter)
server.use('/availableSeats', reservarionStatusRouter)

export {server}