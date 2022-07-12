
const Joi = require('joi');
const userDetailsValidation = async function  (request, response, next){
try { 
     const schema = Joi.object({
        passengerId: Joi.string()
        .alphanum()
        .required(),
        busId: Joi.string()
        .alphanum()
        .required(),
        origin: Joi.string()
        .required(),
        destination: Joi.string()
        .required(),
        phoneNumber: Joi.number()
        .required()
       
    })
  const data = request.body
  userDetails = await schema.validateAsync({...data})
  request.body = userDetails
  next()
}
 catch(error) {
    console.log(error)
    }
}
module.exports = {
    userDetailsValidation
}