const express = require("express");
const router = express.Router();
const pool = require("../db/pool.js");
const dayjs = require("dayjs");

const allTexts = "SELECT * FROM texts";
const desc = "ORDER BY created_at DESC";

router.get("/info", (req, res) => {
  if (req.session.userName) {
    res.send(req.session.userName);
  } else {
    res.send("NG");
  }
});

router.get("/text", (req, res) => {
  pool.query(`${allTexts} ${desc} LIMIT 5`).then((result) => {
    res.send(result.rows);
  });
});

router.put("/text", (req, res) => {
  const createdAt = dayjs().format("YYYY-MM-DD HH:mm:ss");
  pool
    .query(
      "INSERT INTO texts (text, user_id, user_name, created_at) VALUES ($1, $2, $3, $4)",
      [req.body.text, req.session.userId, req.session.userName, createdAt]
    )
    .then(() => {
      pool.query(`${allTexts} ${desc}  LIMIT 1`).then((result) => {
        res.send(result.rows);
      });
    })
    .catch((e) => res.send(e.code));
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("OK");
});

router.get("/users/:id", (req, res) => {
  pool
    .query(`${allTexts} WHERE user_id = $1 ${desc}`, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((e) => {
      res.send("NG");
    });
});

module.exports = router;
