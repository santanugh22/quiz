import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const validUser = (req, res, next) => {
  const token = req.header("token");
  if (!token) return res.status(401).json("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.JWT_KEY);

    req.user = verified.id;
    next();
  } catch (error) {
    res.status(400).json("Invalid Token");
  }
};

export default validUser;
