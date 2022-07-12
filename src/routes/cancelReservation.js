const express = require('express');
const router = express.Router();
const controller = require('../controllers/cancellationController');
const middleware = require('../middlewares/cancellationMiddleware');

router.delete('/cancelRide', controller.cancelBooking, middleware.passengerDetailsValidation)
module.exports = router