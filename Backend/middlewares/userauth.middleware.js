import jwt from 'jsonwebtoken'
import { statusCode } from '../utils/constants.js';
import { jsonGenrater } from '../utils/helper.js';

export const auth=(req, res, next) =>
{
    // grap the token
    console.log(req.cookies);
    const {token}=req.cookies

    if(! token)
    {
        return res.status(statusCode.UNPROSESENTITY).json(jsonGenrater("oops token is missing"))
    }

    // if the token is present
    try {
        // 1.valiadate the token

        const decode=jwt.verify(token,"giveyoursecret")
        console.log(decode);
        req.user=decode
        return next()




    } catch (error) {
        return  res.status(statusCode.UNPROSESENTITY.json(jsonGenrater("oops token is invalid")))
    }
}