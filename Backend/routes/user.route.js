import express from 'express'

const route=express.Router()

import {home, register} from '../contollers/user.contoller.js'
import validatorRegistration from '../schema_validator/validator.registration.js'


// home route
route.get('/', home)

//Registration route
route.post('/registration',validatorRegistration, register) 


export default route