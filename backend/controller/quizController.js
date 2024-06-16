import pool from "../db/connection.js";
async function createQuiz(req, res) {
  try {
    const user_id = req.user;
    const { questions } = req.body;

    const user_details = await pool.query(
      "SELECT user_type,college,department WHERE user_id=$1",
      [user_id]
    );
    

  } catch (error) {}
}

async function accessQuiz(req, res) {
  try {
  } catch (error) {}
}

async function deleteQuiz(req, res) {
  try {
  } catch (error) {}
}

async function getAllQuiz(req, res) {
  try {
  } catch (error) {}
}

export { createQuiz, getAllQuiz, deleteQuiz, accessQuiz };
