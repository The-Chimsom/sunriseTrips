import joi from 'joi'

     export const reservationSchema = joi.object({
        passengerId: joi.string()
        .alphanum()
        .required(),
        busId: joi.string()
        .alphanum()
        .required(),
        origin: joi.string()
        .required(),
        destination: joi.string()
        .required(),
        phoneNumber: joi.number()
        .required()
       
    });