import { connectToDb } from './model/db';
const server = require('./server');

(async function (app) {
    const PORT = 2001
    const mongoClient = await connectToDb();
    app.locals.mongoDbInstance = mongoClient;
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
    })
})(server)

