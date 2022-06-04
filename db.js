const { MongoClient } = require('mongodb')

let dbConnection

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect('mongodb://localhost:27017/sunriseTrips')
        .then( (client) => {
         dbConnection = client.db()
        cb()
        })
        .catch(err => {
            console.log(err)
            cb()
        })
    },
    getDb: () => dbConnection
}