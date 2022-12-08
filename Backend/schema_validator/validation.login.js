import { check } from "express-validator";


const validatorLogin=[
   
    check('email',"email is required").isEmail().exists().withMessage('write the valid format for email '),
    
    check('password').exists().isLength({min:6, max:15}).withMessage('password length must be min 6 digit and max 15 digit')

]

export default validatorLogin;