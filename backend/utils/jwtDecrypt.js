import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function tokenDecrypt(token) {
  const data = jwt.verify(token, process.env.JWT_KEY);

  return data;
}

export { tokenDecrypt };
