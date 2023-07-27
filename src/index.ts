import { connectToDb } from './model/db';
import {server} from './server';
import {Express } from 'express'

(async function (app: Express) {
   try{
    const PORT = 2001
    const mongoClient = await connectToDb();    
    app.locals.mongoDbInstance = mongoClient;
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
    })
}catch(error){
    console.log(error)
}})(server)

