import { Router } from "express"
import { login, registerUser, signUp } from "../controllers/authController"
import { regDetailsValidation, signUpdetails } from "../middlewares/registrationMiddleware"

const registrationRouter = Router()

registrationRouter.post('/register', regDetailsValidation, registerUser)
registrationRouter.post('/signup', signUpdetails, signUp)
registrationRouter.post('/login',  login)

export {
    registrationRouter
}