import { NextFunction, Request, Response } from "express"
import  { ObjectSchema } from "joi"

export function validateSchema(schema: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
          schema.validate(req.body)
            next()
        } catch (e) {
            console.log({ e })

            res.send(e)
        }
    }
}
