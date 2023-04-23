const express = require('express')
const router = express.Router()
const controller = require('../controllers/authController')
const middleware = require('../middlewares/registrationMiddleware')

router.post(
    '/register',
    middleware.regDetailsValidation,
    controller.registerUser
)
router.post('/signup', middleware.signUpdetails, controller.signUp)
router.post('/login', middleware.tokenAuthentication, controller.login)
module.exports = router