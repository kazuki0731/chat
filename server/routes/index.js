var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/api", (req, res) => {
  res.send("OK");
});

module.exports = router;
