const express = require("express");
const router = express.Router();
const pool = require("../db/pool.js");
const dayjs = require("dayjs");

const allTexts = "SELECT * FROM texts";
const allLikes = "SELECT * FROM likes";
const desc = "ORDER BY created_at DESC";

router.get("/info", (req, res) => {
  if (req.session.userName) {
    res.send({ name: req.session.userName, id: req.session.userId });
  } else {
    res.send("NG");
  }
});

router.get("/text", (req, res) => {
  pool.query(`${allTexts} ${desc} LIMIT 5`).then((result) => {
    res.send(result.rows);
  });
});

router.post("/text", (req, res) => {
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

router.get("/likeCount/:id", (req, res) => {
  pool
    .query(`${allLikes} WHERE user_id = $1`, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    });
});

router.put("/likeCount/increment", (req, res) => {
  const textId = req.body.textId;
  const userId = req.body.userId;

  Promise.all([
    pool.query("UPDATE texts SET likecount = likecount + 1 WHERE id = $1", [
      textId,
    ]),

    pool.query(
      "INSERT INTO likes (user_id, text_id) VALUES ($1, $2) RETURNING *",
      [userId, textId]
    ),
  ])
    .then((result) => {
      console.log(result[1].rows);
      res.send(result[1].rows[0]);
    })
    .catch((e) => console.log(e));
});

router.put("/likeCount/decrement", (req, res) => {
  const textId = req.body.textId;
  const likeId = req.body.likeId;

  Promise.all([
    pool.query("UPDATE texts SET likecount = likecount - 1 WHERE id = $1", [
      textId,
    ]),

    pool.query("DELETE FROM likes WHERE id = $1 RETURNING *", [likeId]),
  ])
    .then((result) => {
      console.log(result[1].rows);
      res.send(result[1].rows[0]);
    })
    .catch((e) => console.log(e));
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("OK");
});

module.exports = router;
