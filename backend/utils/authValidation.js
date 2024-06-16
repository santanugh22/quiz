import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function jwtValidator(req, res, next) {
  try {
    const token = req.headers.token;
    if (!token) {
      res.status(403).json({
        data: "Invalid",
      });
    }
    const data = jwt.verify(token, process.env.JWT_KEY);
    req.user = data.user_id;
    next();
  } catch (error) {
    console.log(error);
  }
}

export { jwtValidator };
