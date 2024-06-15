import pg from "pg";


const pool = new pg.Pool({
  host: "localhost",
  database: "quiz",
});







export default pool;
