const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  database: process.env.ENV_DB,
  user: process.env.ENV_USER,
  password: process.env.ENV_PASSWORD,
  host: process.env.ENV_HOST,
  port: 5432,
  ssl: {
    sslmode: "require",
    rejectUnauthorized: false,
  },
});

module.exports = pool;
