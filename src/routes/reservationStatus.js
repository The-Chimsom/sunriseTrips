const express = require('express')
const router = express.Router()
const controller = require('../controllers/statusControllers')
const statusSchema = require('../middlewares/statusSchema')
const validateSchema = require('../middlewares/validateSchema')
router.get(
    '/reservationStatus',
    validateSchema(statusSchema),
    controller.busStatus
)
module.exports = router