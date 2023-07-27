import { Router } from 'express'
import { createReservation } from '../controllers/reservationController'
import {reservationSchema} from '../middlewares/reservationSchema'
import {validateSchema} from '../middlewares/validateSchema'

const reservationRouter = Router()

reservationRouter.post('/reservation', validateSchema(reservationSchema), createReservation )

export {
    reservationRouter
}