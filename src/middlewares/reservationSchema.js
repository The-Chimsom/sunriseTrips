const Joi = require('joi');
     const reservationSchema = Joi.object({
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
module.exports = {
    reservationSchema
}