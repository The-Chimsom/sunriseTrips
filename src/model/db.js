const {MongoClient} = require('mongodb')

const connectToDb = async ()=>{
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017/')

        return client.db('sunriseTrips')
    }catch (error){
        console.log(error, 'database error')
    }
}
module.exports = {
    connectToDb
}