const Joi = require('joi')
const busValidation = async function (request, response, next) {
    try {
        const schema = Joi.object({
            origin: Joi.string().required().trim(),
            destination: Joi.string().required().trim(),
        })
        const data = request.body
        const requiredBusDetails = await schema.validateAsync({ ...data })
        console.log(requiredBusDetails, 'required details')
        request.body = requiredBusDetails
        next()
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    busValidation,
}
