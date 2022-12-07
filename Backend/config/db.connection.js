import mongoose from  "mongoose"
const MONGODB_URL  = 'mongodb://localhost:27017/AuthSystemPro'


export const connect=()=>
{
    mongoose.connect(MONGODB_URL).then((conn) =>
    {
        console.log(`DATABASE IS CONNECTED AT ${conn.connection.host}`)
    }).catch((error) =>
    {
        console.log(`ERROR IN CONNECTING TO DATABASE ${error}`);
    })
}