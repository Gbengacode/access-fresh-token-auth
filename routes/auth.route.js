import express from "express";
const authRouter = express.Router();
import authController from "../controllers/auth.controller.js";
import limiter from "../middlewares/loginLimiter.middleware.js";
// import { verifyToken } from '../middlewares/auth.middleware.js'
import {
  loginValidationRules,
  regValidationRules,
  validate,
} from "../middlewares/validator.middleware.js";

authRouter.post(
  "/signup",
  regValidationRules(),
  validate,
  authController.signUp
);
authRouter.post(
  "/signin",
  loginValidationRules(),
  validate,
  limiter,
  authController.signIn
);

export default authRouter;
