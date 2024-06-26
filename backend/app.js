import express from "express";
import cors from "cors";
import pool from "./db/connection.js";
import ai from "./routes/aiRoute.js";
import authRouter from "./routes/authRoute.js";
import quizRouter from "./routes/quizRoute.js";
import { DbConnection } from "./db/connection.js";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());

app.use("/ai", ai);

app.use("/auth", authRouter);

app.use("/quiz", quizRouter);

// app.listen(3000, async () => {
//   await DbConnection();
//   console.log("Server is running on port 3000");
// });

async function startServer() {
  try {
    DbConnection().then(() => {
      app.listen(3000, () => {
        console.log("Server is running on port 3000");
      });
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
