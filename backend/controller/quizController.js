import pool from "../db/connection.js";
async function createQuiz(req, res) {
  try {
    const user_id = req.user;
    const {
      quiz_questions,
      quiz_name,
      quiz_duration,
      quiz_college,
      quiz_department,
    } = req.body;

    const user_details = await pool.query(
      "SELECT user_type,college,department FROM auth_table WHERE user_id=$1",
      [user_id]
    );

    if (user_details.rows.length === 0) {
      return res.status(403).json({
        data: "User not found",
      });
    }

    if (user_details.rows[0].user_type !== 1) {
      return res.status(401).send("Only teachers can create quiz");
    }

    // if (
    //   quiz_college != user_details.rows[0].college ||
    //   quiz_department != user_details.rows[0].department
    // ) {

    //   return res.status(401).send("Invalid college or department");
    // }

    const query = `INSERT INTO quiz_table(quiz_questions,quiz_name,quiz_duration,quiz_college,quiz_department,created_by) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`;

    const values = [
      quiz_questions,
      quiz_name,
      quiz_duration,
      quiz_college,
      quiz_department,
      user_id,
    ];

    const newQuiz = await pool.query(query, values);

    res.status(201).json({
      data: "Quiz created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
}

async function accessQuiz(req, res) {
  try {
    const user_id = req.user;
    const quiz_id = req.params.quiz_id;

    const user_details = await pool.query(
      "SELECT user_type,college,department WHERE user_id=$1",
      [user_id]
    );

    if (user_details.rows[0].user_type !== 0) {
      return res.status(401).send("Only students can access quiz");
    }

    const quiz = await pool.query("SELECT * FROM quiz_table WHERE quiz_id=$1", [
      quiz_id,
    ]);

    if (quiz.rows.length === 0) {
      return res.status(404).send("Quiz not found");
    }

    if (
      quiz.rows[0].quiz_college !== user_details.rows[0].college ||
      quiz.rows[0].quiz_department !== user_details.rows[0].department
    ) {
      return res.status(401).send("Invalid college or department");
    }

    res.status(200).json({
      data: quiz.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

async function deleteQuiz(req, res) {
  try {
    const user_id = req.user;
    const quiz_id = req.params.quiz_id;

    const user_details = await pool.query(
      "SELECT user_type,college,department FROM auth_table WHERE user_id=$1",
      [user_id]
    );

    if (user_details.rows[0].user_type !== 1) {
      return res.status(401).send("Only teachers can delete quiz");
    }

    const quiz = await pool.query("SELECT * FROM quiz_table WHERE quiz_id=$1", [
      quiz_id,
    ]);

    if (quiz.rows.length === 0) {
      return res.status(404).json({
        data: "Quiz not found",
      });
    }

    if (quiz.rows[0].created_by != user_id) {
      return res.status(401).json({
        data: "You are not authorized",
      });
    }

    await pool.query("DELETE FROM quiz_table WHERE quiz_id=$1", [quiz_id]);

    res.status(200).json({
      data: "Quiz deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

async function getAllQuiz(req, res) {
  try {
    const user_id = req.user;

    const user_details = await pool.query(
      "SELECT user_type,college,department FROM auth_table WHERE user_id=$1",
      [user_id]
    );

    const quiz = await pool.query(
      "SELECT * FROM quiz_table WHERE quiz_college=$1 AND quiz_department=$2",
      [user_details.rows[0].college, user_details.rows[0].department]
    );

    res.status(200).json({
      data: quiz.rows,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export { createQuiz, getAllQuiz, deleteQuiz, accessQuiz };
