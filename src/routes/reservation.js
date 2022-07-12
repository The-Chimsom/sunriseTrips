const express = require('express')
const router = express.Router()
const middleware = require('../middlewares/reservationMiddleware')
const controller = require('../controllers/reservationController')

router.post('/reservation', middleware.userDetailsValidation, controller.createReservation )
module.exports = router