const express = require("express");
const router = express.Router();
const pool = require("../db/pool.js");

router.get("/", (req, res) => {
  if (req.session.userName) {
    res.send("OK");
  } else {
    res.send("NG");
  }
});

router.post("/", async (req, res) => {
  pool
    .query("SELECT id, name FROM users WHERE email = $1 AND password = $2", [
      req.body.email,
      req.body.password,
    ])
    .then((result) => {
      req.session.userName = result.rows[0].name;
      req.session.userId = result.rows[0].id;
      res.send(result.rows[0]);
    })
    .catch((e) => {
      console.log(e.message);
      res.send("NG");
    });

  // const result = await pool
  //   .query("SELECT id, name FROM users WHERE email = $1 AND password = $2", [
  //     req.body.email,
  //     req.body.password,
  //   ])
  //   .catch((e) => {
  //     res.send("NG");
  //   });

  // req.session.userName = result.rows[0].name;
  // req.session.userId = result.rows[0].id;
  // res.send(result.rows[0]);
});

router.put("/regist", (req, res) => {
  pool
    .query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [
      req.body.name,
      req.body.email,
      req.body.password,
    ])
    .then(() => {
      res.send("OK");
    })
    .catch((e) => {
      res.send(e.code);
    });
});

module.exports = router;
