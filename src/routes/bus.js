const express = require('express')
const router = express.Router()
const controller = require('../controllers/busController')
const middleware = require('../middlewares/busMiddleware')

router.get('/bus', middleware.busValidation, controller.getAvailableBus)

module.exports = router