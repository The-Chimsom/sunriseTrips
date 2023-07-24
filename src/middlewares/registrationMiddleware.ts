import { NextFunction, Request, Response } from "express"
import 'dotenv/config'
import joi from 'joi';
import jwt, { Secret } from 'jsonwebtoken';
import { errorResponder } from '../utils/responder'

export const tokenAuthentication = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const token = String(request.headers['token'])
        if (token === null)
            return errorResponder(response, 401, 'invalid token')
        const decode = jwt.verify(token, process.env.ACCESS_TOP_TOKEN_SECRET as Secret)
        if(typeof decode === "string"){
            errorResponder(response, 403)
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

export const regDetailsValidation = async function (request: Request, _response: Response,  next: NextFunction) {
    try {
        const schema = joi.object({
            firstName: joi.string().required(),
            lastName: joi.string().required(),
            gender: joi.string().required(),
            age: joi.number().required(),
            phoneNumber: joi.number().required(),
        })
        const data = request.body
        const registration = await schema.validateAsync({ ...data })
        request.body = registration
        next()
    } catch (error) {
        console.log(error)
    }
}
export const signUpdetails = async (request: Request, _response: Response, next: NextFunction) => {
    try {
        const schema = joi.object({
            firstName: joi.string().required(),
            lastName: joi.string().required(),
            email: joi.string().email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net'] },
            }),
            password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            phoneNumber: joi.number().required(),
        })
        const data = request.body
        const registration = await schema.validateAsync({ ...data })
        request.body = registration
        next()
    } catch (error) {
        console.log(error)
    }
}


