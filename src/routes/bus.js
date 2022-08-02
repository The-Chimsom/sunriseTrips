const express = require('express')
const router = express.Router()
const controller = require('../controllers/busController')
const busSchema = require('../middlewares/bus.schema')
const validateSchema = require('../middlewares/validateSchema')

router.get('/bus', validateSchema(busSchema), controller.getAvailableBus)

module.exports = router
