import { Router } from "express";
import { loginController, registerController } from "../controller/authController.js";
const authRouter = Router();

authRouter.post("/login", loginController);

authRouter.post("/register",registerController);

authRouter.post("/forgot-pass");

export default authRouter;
