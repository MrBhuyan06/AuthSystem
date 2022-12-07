import { check } from "express-validator";


const validatorRegistration=[
    check('name',"name is required").isAlpha().exists().withMessage('Name must be alphaNumeric'),
    check('email',"email is required").isEmail().exists().withMessage('write the valid format for email '),
    check('phone_no',"phonenumber is required").isNumeric().exists().withMessage('Number must be number format'),
    check('password').exists().isLength({min:6, max:15}).withMessage('password length must be min 6 digit and max 15 digit')

]

export default validatorRegistration;