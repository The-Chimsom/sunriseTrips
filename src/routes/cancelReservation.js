const express = require('express');
const router = express.Router();
const controller = require('../controllers/cancellationController');
const middleware = require('../middlewares/cancellationMiddleware');

router.delete(
    '/cancelRide',
    middleware.passengerDetailsValidation,
    controller.cancelBooking
)
module.exports = router