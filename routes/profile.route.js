import express from "express";
import verifyToken from "../middlewares/auth.middlewares.js";
const profileRouter = express.Router();

// import verifyToken from "../middlewares/auth.middleware.js";

profileRouter.get("/user", verifyToken, (req, res) => {
    res.send("testing profile")
});

export default profileRouter;
