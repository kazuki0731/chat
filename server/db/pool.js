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

// const pool = new Pool({
//   database: "newtodo",
//   user: "kawabata",
//   host: "localhost",
//   password: "XLwdAX2m",
//   port: 5432,
// });

module.exports = pool;
