import { Router } from "express"
import { login, registerUser, signUp } from "../controllers/authController"
import { regDetailsValidation, signUpdetails, tokenAuthentication } from "../middlewares/registrationMiddleware"

export const registrationRouter = Router()

registrationRouter.post('/register', regDetailsValidation, registerUser)
registrationRouter.post('/signup', signUpdetails, signUp)
registrationRouter.post('/login', tokenAuthentication, login)
