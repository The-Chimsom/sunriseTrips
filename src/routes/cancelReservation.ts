import {cancelBooking} from '../controllers/cancellationController';
import { Router } from 'express';
import {cancellationSchema} from '../middlewares/cancellationSchema';
import {validateSchema} from '../middlewares/validateSchema'


export const cancelReservationRouter = Router()

cancelReservationRouter.delete(
    '/cancelRide',
    validateSchema(cancellationSchema),
    cancelBooking
)
