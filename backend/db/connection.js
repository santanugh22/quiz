import pg from "pg";
import { createAuthTable } from "./tables/createAuthTable.js";
import { createQuizTable } from "./tables/createQuizTable.js";

const pool = new pg.Pool({
  host: "localhost",
  database: "quiz",
});

export async function DbConnection() {
  try {
    await pool.query(createAuthTable);

    await pool.query(createQuizTable);
    console.log("Tables created successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default pool;
