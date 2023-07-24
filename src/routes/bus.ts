import { getAvailableBus } from "../controllers/busController"
import  { Router } from 'express'
import {busSchema} from '../middlewares/bus.schema'
import {validateSchema } from '../middlewares/validateSchema'

export const busrouter = Router()

busrouter.get('/bus', validateSchema(busSchema), getAvailableBus)
