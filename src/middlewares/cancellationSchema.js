const Joi = require('joi')
 const cancellationSchema = Joi.object({
     passengerId: Joi.string().alphanum().trim().required(),
     busId: Joi.string().alphanum().trim().required(),
     reservationId: Joi.string().alphanum().required(),
 })
 module.exports = {cancellationSchema}