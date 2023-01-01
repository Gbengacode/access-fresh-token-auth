import express from "express";
import userController from "../controllers/user.controller.js";
import verifyToken from "../middlewares/auth.middlewares.js";

const usersRouter = express.Router();

usersRouter.get("/users", userController.getUsers  );

export default usersRouter;
