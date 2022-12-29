import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from 'cors'
import { logger } from "./middlewares/logger.middleware.js";
import authRouter from "./routes/auth.route.js";
import corOptions from "./config/cors.js";
import errorHandler from "./middlewares/error.middleware.js";
import dbConfig from "./config/dbConfig.js";

const app = express();
app.use(logger)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corOptions))
// app.use(morgan("combined"));
app.use("/api/auth", authRouter);


app.all("*", (req, res) => {
  res.status(404).json({ error: true, message: "wrong request path"})
  
})

dbConfig();
const PORT = process.env.PORT || 6000;
app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
