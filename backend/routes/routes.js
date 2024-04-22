import { Router } from "express";
import dbPool from "../db/connection.js";
import jwt from "jsonwebtoken";
import dtoenv from "dotenv";
import validUser from "../validUser.js";
dtoenv.config();

const router = Router();

router.post("/auth/register", async (req, res) => {
  try {
    const { username, email, password, user_type } = req.body;
    const newUser = await dbPool.query(
      "INSERT INTO users (username, email, password, user_type) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, email, password, user_type]
    );

    const token = jwt.sign(
      { id: newUser.rows[0].id, user_type: newUser.rows[0].user_type },
      process.env.JWT_KEY,
      {
        expiresIn: "30d",
      }
    );

    res.status(200).json({
      status: "success",
      user_type: newUser.rows[0].user_type,
      data: {
        token,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const query = "SELECT * FROM users WHERE email = $1";
    const user = await dbPool.query(query, [email]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    if (user.rows[0].password !== password) {
      return res.status(401).json("Invalid Credential");
    }

    const token = jwt.sign(
      { id: user.rows[0].id, user_type: user.rows[0].user_type },
      process.env.JWT_KEY,

      {
        expiresIn: "30d",
      }
    );

    res.status(200).json({
      status: "success",
      user_type: user.rows[0].user_type,
      data: {
        token,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/home/user", validUser, async (req, res) => {
  try {
    const user = req.user;

    const userInfo = await dbPool.query("SELECT * FROM users WHERE id=$1", [
      user,
    ]);
    if (userInfo.rows.length === 0) {
      return res.status(401).json("User not found");
    }
    res.status(200).json({
      status: "success",
      data: userInfo.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/quiz/create", validUser, async (req, res) => {
  try {

    const user = req.user;
    const { quiz_name, questions } = req.body;



    const newQuiz = await dbPool.query(
      "INSERT INTO quiz (quiz_name, quiz_questions, created_by) VALUES ($1, $2, $3) RETURNING *",
      [quiz_name, JSON.stringify(questions), user]
    );



    res.status(200).json({
      status: "success",
      data: newQuiz.rows[0],
    });
  } catch (error) {
    // res.status(500).json({error:"You are not doing well"})
    // console.log(error);
  }
});


router.get("/quiz", validUser, async (req, res) => {
    try {
        const user=req.user

        const quiz = await dbPool.query("SELECT * FROM quiz WHERE created_by=$1", [user]);

        res.status(200).json({
            status: "success",
            data: quiz.rows,
        });
        
    } catch (error) {
        console.log(error)
        
    }

})

export default router;
