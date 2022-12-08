import express from 'express'

const route=express.Router()

import {dashboard, home, login, register} from '../contollers/user.contoller.js'
import { auth } from '../middlewares/userauth.middleware.js'
import validatorLogin from '../schema_validator/validation.login.js'
import validatorRegistration from '../schema_validator/validator.registration.js'


// home route
route.get('/', home)

//Registration route
route.post('/registration',validatorRegistration, register) 

//Registration route
route.post('/login',validatorLogin, login) 

// DashBorad Route

route.get('/dashboard', auth, dashboard)


export default route