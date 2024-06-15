import express from "express";
import cors from "cors";
import pool from "./db/connection.js";
import ai from "./routes/aiRoute.js";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());


app.use("/ai", ai);

app.listen(3000, async () => {
  console.log("Server is running on port 3000");
});
