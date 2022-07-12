const express = require('express')
const router = express.Router()
const controller = require('../controllers/registerController')
const middleware = require('../middlewares/registrationMiddleware')

router.post('/register', controller.registerUser, middleware.regDetailsValidation)
module.exports = router