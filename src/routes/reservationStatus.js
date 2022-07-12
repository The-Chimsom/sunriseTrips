const express = require('express')
const router = express.Router()
const controller = require('../controllers/statusControllers')
const middleware = require('../middlewares/statusMiddleware')

router.get('/reservationStatus', controller.busStatus, middleware.busDetailValidation)
module.exports = router