import dotenv  from "dotenv";
dotenv.config()
import {connect} from './config/db.connection.js'
connect()
import express  from "express";
const app=express();
app.use(express.json())

import routes from "./routes/user.route.js";

console.log(routes);

app.use('/api/v1', routes)

export default app;