const express = require('express');
const router = express.Router();
const controller = require('../controllers/cancellationController');
const cancellationSchema = require('../middlewares/cancellationSchema');
const validateSchema = require('../middlewares/validateSchema')

router.delete(
    '/cancelRide',
    validateSchema(cancellationSchema),
    controller.cancelBooking
)
module.exports = router