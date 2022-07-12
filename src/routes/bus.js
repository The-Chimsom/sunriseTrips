const express = require('express')
const router = express.Router()
const controller = require('../controllers/busController')
const middleware = require('../middlewares/busMiddleware')

router.get('/bus', controller.getAvailableBus, middleware.busValidation)

module.exports = router