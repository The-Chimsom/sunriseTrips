import express from "express"
import { busRouter } from "./routes/bus"
import { cancelReservationRouter } from "./routes/cancelReservation"
import { registrationRouter } from "./routes/registration"
import { reservarionStatusRouter } from "./routes/reservationStatus"



export const server = express()

server.use(express.json())
server.use('/available', busRouter)
server.use('/cancel', cancelReservationRouter)
server.use('/user/access', registrationRouter)
server.use('/booking', reservarionStatusRouter)
server.use('/availableSeats', reservarionStatusRouter)
