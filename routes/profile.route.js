import express from "express";
const profileRouter = express.Router();

import verifyToken from "../middlewares/auth.middleware.js";

profileRouter.post("/user", verifyToken, signUp);

export default profileRouter;
