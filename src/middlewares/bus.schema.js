const joi = require('joi')
const busSchema = joi.object({
    origin: joi.string().required().trim(),
    destination: joi.string().required().trim(),
})
module.exports = busSchema
