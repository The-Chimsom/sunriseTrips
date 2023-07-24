import joi from 'joi';

export const statusSchema = joi.object({
    busId: joi.string().alphanum().trim().required(),
})

