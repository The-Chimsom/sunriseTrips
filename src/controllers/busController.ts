import { Request } from "express"
const { successResponder, errorResponder } = require('../utils/responder')

export const getAvailableBus = async (request: Request, response: Request) => {
    try {
         const mongoDbInstance = request.app.locals.mongoDbInstance
    const { origin, destination } = request.body
    const bus = await mongoDbInstance
        .collection('buses')
        .findOne({ origin, destination })
    if (!bus || bus.reservations.length >= 15) {
        errorResponder(
            response,
            404,
            'bus to specified destination is currently not available'
        )
    }
    console.log(bus)
    if (bus.reservations.length <= 15) {
        return successResponder(response, bus, 'bus accessed')
    }
}
    catch (error){
console.log(error)
    }
}

