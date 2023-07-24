
const controller = require('../controllers/statusControllers')
import { Router } from 'express'
import { busStatus } from '../controllers/statusControllers'
import {statusSchema} from '../middlewares/statusSchema'
import {validateSchema} from '../middlewares/validateSchema'

export const router = Router()

router.get(
    '/reservation',
    validateSchema(statusSchema),
    busStatus
)
