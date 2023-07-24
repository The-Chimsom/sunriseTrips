const Joi = require('joi')
const jwt = require('jsonwebtoken')
const { errorResponder } = require('../utils/responder')

const tokenAuthentication = async (request, response, next) => {
    try {
        const authHeader = request.header.authoriztion
        const token = authHeader && authHeader.split(' ')[1]
        if (token === null)
            return errorResponder(response, 401, 'invalid token')
        jwt.verify(token, process.env.ACCESS_TOP_TOKEN_SECRET, (err, user) => {
            if (err) return errorResponder(response, 403)
            user = request.user
            next()
        })
    } catch (error) {}
}
const regDetailsValidation = async function (request, response, next) {
    try {
        const schema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            gender: Joi.string().required(),
            age: Joi.number().required(),
            phoneNumber: Joi.number().required(),
        })
        const data = request.body
        const registration = await schema.validateAsync({ ...data })
        request.body = registration
        next()
    } catch (error) {
        console.log(error)
    }
}
const signUpdetails = async (request, response, next) => {
    try {
        const schema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net'] },
            }),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            phoneNumber: Joi.number().required(),
        })
        const data = request.body
        const registration = await schema.validateAsync({ ...data })
        request.body = registration
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    regDetailsValidation,
    signUpdetails,
    tokenAuthentication,
}
