import mongoose from  "mongoose"
// mongoose.set('strictQuery', true)
const MONGODB_URL  = 'mongodb://localhost:27017/AuthSystemPro'


export const connection=()=>
{
    mongoose.connect(MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((conn) =>
    {
        console.log(`DATABASE IS CONNECTED AT ${conn.connection.host}`)
    }).catch((error) =>
    {
        console.log(`ERROR IN CONNECTING TO DATABASE ${error}`);
    })
}