import { Router } from 'express'
import { createReservation } from '../controllers/reservationController'
import {reservationSchema} from '../middlewares/reservationSchema'
import {validateSchema} from '../middlewares/validateSchema'

const router = Router()

router.post('/reservation', validateSchema(reservationSchema), createReservation )
module.exports = router