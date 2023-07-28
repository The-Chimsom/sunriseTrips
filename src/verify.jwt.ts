import { Request } from 'express'
import jwt, { Secret } from 'jsonwebtoken'

export const tokenAuthentication = async (
    request: Request
) => {
    try {
        const token = request.headers.authorization?.split(' ')[1]
        if (!token){throw new Error('invalid token')}
        const decode = jwt.verify(token, 'TOP SECRET')
        if (typeof decode === 'string') {
            throw new Error('invalid')
        }
        return decode
    } catch (error) {
        console.log(error)
        return error
    }
}
