import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const verifyToken =  async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (typeof token === "undefined")
      return res
        .status(401)
        .json({ success: false, error: "login to access this resource" });
    if (token.length < 500) {
        await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ success: false, error: err.message });
        req.user = user;
        next();
      });
    } else {
      req.user = jwt.decode(token)?.sub;
      next();
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default verifyToken