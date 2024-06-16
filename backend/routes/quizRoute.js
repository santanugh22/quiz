import { Router } from "express";
import { jwtValidator } from "../utils/authValidation.js";
import {
  accessQuiz,
  createQuiz,
  deleteQuiz,
  getAllQuiz,
} from "../controller/quizController.js";

const quizRouter = Router();

quizRouter.post("/create", jwtValidator, createQuiz);

quizRouter.post("/access/:quiz_id", jwtValidator, accessQuiz);

quizRouter.get("/all", jwtValidator, getAllQuiz);

quizRouter.delete("/delete/:quiz_id", jwtValidator, deleteQuiz);

export default quizRouter;
