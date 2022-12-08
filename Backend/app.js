import dotenv  from "dotenv";
dotenv.config()
import {connection} from './config/db.connection.js'
connection()
import express  from "express";
import cookieParse from 'cookie-parser'

const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParse())

import routes from "./routes/user.route.js";

console.log(routes);

app.use('/api/v1', routes)

export default app;