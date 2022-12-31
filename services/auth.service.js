import dotenv from "dotenv";
dotenv.config();
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { generateTokens } from "../utils/token.js";

export const signupProcess = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist)
    return res
      .status(422)
      .json({ success: false, error: "user is already registered" });
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const newUser = await new User({
    firstName,
    lastName,
    email,
    password: hashPassword,
  }).save();

  if (newUser){
    const userInfo = {
      id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email
    }
    const generatedAccessToken = generateTokens(res, userInfo);
     return res.status(200).json({ accessToken: generatedAccessToken, userInfo })
  }
});

export const signInProcess = async (req, res) => {
  const { email, password } = req.body;
  const result = await User.findOne({ email });
  if (!result)
    return res
      .status(422)
      .json({ success: false, error: "invalid crendential" });
  const isCorrectPassword = await bcrypt.compare(password, result.password);
  if (!isCorrectPassword)
    return res
      .status(422)
      .json({ success: false, message: "invalid credential" });

      const userInfo = {
        id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email
      }

  const generatedAccessToken = generateTokens(res, userInfo);
  return res.status(200).json({ accessToken: generatedAccessToken, userInfo })
};

export const signOutProcess = async(req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })

}

export const refreshProcess = (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

  const refreshToken = cookies.jwt

  jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      asyncHandler(async (err, decoded) => {
          if (err) return res.status(403).json({ message: 'Forbidden' })
           
          const foundUser = await User.findOne({ email: decoded.email })
            
          if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })
          const userInfo = {
            id: foundUser._id,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            email: foundUser.email
          }
          const accessToken = jwt.sign(
             userInfo,
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: '300s' }
          )

          res.status(200).json({ accessToken, userInfo })
      })
  )
}