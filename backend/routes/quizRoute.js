import { Router } from "express";

const quizRouter = Router();

quizRouter.post("/create");

quizRouter.post("/access/:quiz_id");

quizRouter.get("/all");

quizRouter.delete("/delete/:quiz_id");

export default quizRouter;
