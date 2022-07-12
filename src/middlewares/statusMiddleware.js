const joi = require('joi')
const busDetailValidation = async function (request, response, next){
    try {
        const schema = joi.object({
            busId: joi.string().alphanum().trim().required()
        })
        const data = request.body
        const requiredBusDetails = await schema.validateAsync({...data})
        request.body = requiredBusDetails
        next()
    }
    catch(error){
        console.log(error)
    }   
}
module.exports = {
    busDetailValidation
}