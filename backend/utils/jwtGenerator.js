import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function tokenGenerator(data) {
  const token = jwt.sign(data, process.env.JWT_KEY, {
    expiresIn: "24h",
  });

  return token;
}

export { tokenGenerator };
