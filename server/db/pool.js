const { Pool } = require("pg");

const pool = new Pool({
  database: "newtodo",
  user: "kawabata",
  host: "localhost",
  password: "XLwdAX2m",
  port: 5432,
});

module.exports = pool;
