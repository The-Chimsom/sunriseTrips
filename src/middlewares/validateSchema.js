function validateSchema(schema) {
    return async (req, res, next) => {
        try {
            await schema.validate(req.body)
            next()
        } catch (e) {
            console.log({ e })

            res.send(e)
        }
    }
}

module.exports = validateSchema
