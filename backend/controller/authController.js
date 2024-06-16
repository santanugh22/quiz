import { tokenGenerator } from "../utils/jwtGenerator.js";
import pool from "../db/connection.js";

async function loginController(req, res) {
  try {
    const { email, password, user_type } = req.body;

    if (!email || !password || !user_type) {
      return res.status(403).json({
        data: "Email or Password or Type not provided",
      });
    }

    const userCheck = await pool.query(
      "SELECT name,user_id,email,user_type,college FROM auth_table WHERE email=$1 and password=$2",
      [email, password]
    );

    if (!userCheck.rows) {
      return res.status(402).json({
        data: "User not found",
      });
    }

    const user_id = userCheck.rows[0].user_id;

    const token = tokenGenerator({
      email: email,
      user_type: user_type,
      user_id: user_id,
    });

    res.status(200).json({
      data: token,
      email: email,
      name: userCheck.rows[0].name,
      college: userCheck.rows[0].college,
    });
  } catch (error) {
    res.status(502).json(error);
  }
}

async function registerController(req, res) {
  try {
    const { email, password, name, college, department, user_type } = req.body;

    if (email && password && name && college && department && user_type) {
      const userCheck = await pool.query(
        "SELECT email FROM auth_table WHERE email=$1",
        [email]
      );

      if (userCheck.rows.length != 0) {
        return res.status(405).json({
          data: "User already exists",
        });
      }

      const registerUser = await pool.query(
        "INSERT INTO auth_table(name,email,password,user_type,college,department) VALUES ($1,$2,$3,$4,$5,$6) RETURNING * ",
        [name, email, password, user_type, college, department]
      );

      const token = tokenGenerator({
        email: email,
        user_type: user_type,
        user_id: registerUser.rows[0].user_id,
      });

      res.status(200).json({
        data: token,
        email: email,
        name: name,
        college: college,
      });
    }
    res.status(403).json({
      data: "All fields necessary",
    });
  } catch (error) {
    res.status(502).json(error);
  }
}

export { loginController, registerController };
