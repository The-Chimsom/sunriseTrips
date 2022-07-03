const { connectToDb, getDb } = require('../model/db')
const { successResponder, errorResponder } = require('../utils/responder')
const route = require('../routes/bus')

let db
connectToDb(function (err) {
    if (!err) {
        app.listen(PORT, () => {
            console.log(`app is listening on port ${PORT}`)
        })
        db = getDb()
    }
})
const getAvailableBus = async (request, response) => {
    const { origin, destination } = request.body
    const bus = await db.collection('buses').findOne({ origin, destination })
    if (!bus || bus.reservations.length >= 15) {
        errorResponder(
            response,
            404,
            'bus to specified destination is currently not available'
        )
    }
    console.log(bus)
    if (bus.reservations.length <= 15) {
        return successResponder(response, bus)
    }
}
module.exports = {
    getAvailableBus
}
