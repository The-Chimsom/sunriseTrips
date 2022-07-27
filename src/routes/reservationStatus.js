const express = require('express')
const router = express.Router()
const controller = require('../controllers/statusControllers')
const middleware = require('../middlewares/statusMiddleware')

router.get(
    '/reservationStatus',
    middleware.busDetailValidation,
    controller.busStatus
)
module.exports = router