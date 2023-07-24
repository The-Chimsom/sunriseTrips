import joi from "joi"

export const busSchema = joi.object({
    origin: joi.string().required().trim(),
    destination: joi.string().required().trim(),
})
