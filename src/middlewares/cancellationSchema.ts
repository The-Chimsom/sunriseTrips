import joi from 'joi'

 export const cancellationSchema = joi.object({
     passengerId: joi.string().alphanum().trim().required(),
     busId: joi.string().alphanum().trim().required(),
     reservationId: joi.string().alphanum().required(),
 })
