const Joi = require('joi')
const regDetails = async function(request, response, next){
    try {
        const schema = Joi.object({
            firstName: Joi.string()
            .required(),
            lastName: Joi.string()
            .required(),
            gender: Joi.string()
            .required(),
            age: Joi.number()
            .required(),
            phoneNumber: Joi.number()
            .required()
        })
        const data = request.body
        const registration = await schema.validateAsync({...data})
    }
    catch(error){
        console.log(error)
    }
}
module.exports = { 
    regDetails
}