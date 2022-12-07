import { validationResult } from "express-validator";
import { STATUS_CODES } from "http";
import user from "../models/user.schema.js";
import { statusCode } from "../utils/constants.js";
import { jsonGenrater } from "../utils/helper.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const home = (req, res) => {
  res.send("Welcome to home");
};
//Register routes

export const register = async (req, res) => {
  // check the error in the data send from the frontend
  const error = validationResult(req);

  if (error.isEmpty()) 
  {
    // destructure the object
    const { name, email, phone_no, password } = req.body;
    // check for exist user
    const existUser = await user.findOne({
      $or: [
        {
          phone_no: phone_no, // modelprop:reqprop
        },
        {
          email: email,
        },
      ],
    },{ strictQuery: false });
    if(existUser)
    {
        return res.status(statusCode.UNPROSESENTITY).json(jsonGenrater('User is already exist',))
    }
     

    try 
    {
         // if the user is new user taken the password of the user and ebcrypt it
         const encryptpassword= await bcrypt.hash(password,10)
         // create the token

         const token= await jwt.sign({
            userid:existUser._id,
            name
         },'giveyoursecret',{expiresIn:'2h'});
         // save to the database
        
        const user_deails= await user.create({
            name,
            email,
            phone_no,
            password:encryptpassword
        })
        // assign the token value but not save in the databases
        user_deails.token=token
        // send the resphone
        return res.status(statusCode.SUCCESS).json(jsonGenrater("user registerer successfully",user_deails))




    } catch (error) 
    {
        return res.json(jsonGenrater("Error in database",error.mapped))
    }
   
 }
  
  else 
  {
    return res
      .status(statusCode.VALIDATIONERROR)
      .json(jsonGenrater("Validation_Error", error.mapped()));
  }
};
