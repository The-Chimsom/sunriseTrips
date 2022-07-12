const Joi = require('joi')
const passengerDetailsValidation = async function (request, response, next) {
    try {
        const schema = Joi.object({
            passengerId: Joi.string().alphanum().trim().required(),
            busId: Joi.string().alphanum().trim().required(),
            reservationId: Joi.string().alphanum().required(),
        })
        const data = request.body
        const details = await schema.validateAsync({ ...data })
        request.body = details
        next()
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    passengerDetailsValidation
}
