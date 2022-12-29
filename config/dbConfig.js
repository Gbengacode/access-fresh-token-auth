import mongoose from "mongoose";
import { logEvents } from "../middlewares/logger.middleware.js";
mongoose.set("strictQuery", false);
const dbConfig = () => {
  mongoose
    .connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((error) => {
      console.log(error);
    });
  mongoose.connection.on("connected", () => {
    console.log("connected");
  });

  mongoose.connection.on("error", (err) => {
    console.log(`error ${err}`);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
  });

  mongoose.connection.on("disconnected", () => {
    console.log("disconnected");
  });
};

export default dbConfig;
