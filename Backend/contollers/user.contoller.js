import { validationResult } from "express-validator";
import { STATUS_CODES } from "http";
import user from "../models/user.schema.js";
import { statusCode } from "../utils/constants.js";
import { jsonGenrater } from "../utils/helper.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const home = (req, res) => {
  res.send("Welcome to home");
};
//Register routes

export const register = async (req, res) => {
  // check the error in the data send from the frontend
  const error = validationResult(req);

  if (error.isEmpty()) {
    // destructure the object
    const { name, email, phone_no, password } = req.body;
    // check for exist user
    const existUser = await user.findOne(
      {
        $or: [
          {
            phone_no: phone_no, // modelprop:reqprop
          },
          {
            email: email,
          },
        ],
      },
      { strictQuery: false }
    );
    if (existUser) {
      return res
        .status(statusCode.UNPROSESENTITY)
        .json(jsonGenrater("User is already exist"));
    }

    try {
      // if the user is new user taken the password of the user and ebcrypt it
      const encryptpassword = await bcrypt.hash(password, 10);

      const user_deails = await user.create({
        name,
        email,
        phone_no,
        password: encryptpassword,
      });
      // create the token

      const token = await jwt.sign(
        {
          userid: user_deails._id,
          email,
        },
        "giveyoursecret",
        { expiresIn: "2h" }
      );
      // save to the database
      // assign the token value but not save in the databases
      user_deails.token = token;
      user_deails.password = undefined;
      // send the resphone
      return res
        .status(statusCode.SUCCESS)
        .json(jsonGenrater("user registerer successfully", user_deails));
    } catch (error) {
      // return res.json(jsonGenrater("Error in database",error.mapped))
      console.log(`hello ${error}`);
    }
  } else {
    return res
      .status(statusCode.VALIDATIONERROR)
      .json(jsonGenrater("Validation_Error", error.mapped()));
  }
};

//login controller

export const login = async (req, res) => {
  // check for the error
  try {
    const error = validationResult(req);
    if (error.isEmpty()) {
      // check user register before login or not

      const { email, password } = req.body;
      console.log(email);
      console.log(password);

      const User = await user.findOne({
        email:email
      });
      console.log(User);
      if (! User) {
        return res
          .status(statusCode.UNPROSESENTITY)
          .json(
            jsonGenrater(
              "User need to register first before login or the email and password wrong"
            )
          );
      }
      console.log(User.password);

      if (User && (await bcrypt.compare(password, User.password))) {
        // create the token

        const token = await jwt.sign(
          {
            userid: User._id,
            email,
          },
          "giveyoursecret",
          { expiresIn: "2h" }
        );
        console.log(token);
        // save to the database
        // assign the token value but not save in the databases
        User.token = token;
        User.password = undefined;
        // res.cookie

        const option = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };

        return res
          .status(statusCode.SUCCESS)
          .cookie("token", token, option)
          .json(jsonGenrater("user login successfully", User));
      }
      else
      {
        return res
          .status(statusCode.UNPROSESENTITY)
          .json(
            jsonGenrater(
              "email and password wrong"
            )
          );
      }
    } else {
      return res
        .status(statusCode.VALIDATIONERROR)
        .json(jsonGenrater("Validation_Error", error.mapped()));
    }
  } catch (err) {
    console.log(`hello ${err}`);
  }
};

//dashboard route
export const dashboard = async (req, res) =>
{
  const {userid, email}=req.user
  res.send(`welcome to the dashboard ${userid} ${email}`)
}
