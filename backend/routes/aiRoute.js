import { Router } from "express";
import { CreateQuiz } from "../controller/aiController.js";

const ai = Router();

ai.post("/create", CreateQuiz);

ai.post("/analyze");


export default ai;