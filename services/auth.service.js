import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateAccessToken, sendAccessToken } from "../utils/token.js";

export const signupProcess = async (req, res) => {
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
  if (newUser)
    return res
      .status(201)
      .json({
        success: true,
        message: `congratulation ${firstName}. Your registration was successful`,
      });
  return res.status(400).json({ success: false, message: error.message });
};

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
  const generatedAccessToken = generateAccessToken(result._id);
  res.cookie("token", generatedAccessToken, { expiresIn: new Date() + 9999 });
  sendAccessToken(res, generatedAccessToken, result);
};
