
const controller = require('../controllers/statusControllers')
import { Router } from 'express'
import { busStatus } from '../controllers/statusControllers'
import {statusSchema} from '../middlewares/statusSchema'
import {validateSchema} from '../middlewares/validateSchema'

export const reservarionStatusRouter = Router()

reservarionStatusRouter.get(
    '/reservation',
    validateSchema(statusSchema),
    busStatus
)
