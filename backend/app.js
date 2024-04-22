import express from "express";
import cors from "cors";
import authRouter from "./routes/routes.js";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());

app.use("/api/v1", authRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
