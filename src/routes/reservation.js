const express = require('express')
const router = express.Router()
const controller = require('../controllers/reservationController')
const reservationSchema = require('../middlewares/reservationSchema')
const validateSchema = require('../middlewares/validateSchema')

router.post('/reservation', validateSchema(reservationSchema), controller.createReservation )
module.exports = router