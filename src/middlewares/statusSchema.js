const joi = require('joi')
        const statusSchema = joi.object({
            busId: joi.string().alphanum().trim().required()
        })  
module.exports = {
    statusSchema
}