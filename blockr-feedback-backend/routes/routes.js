const express = require("express"),
  router = express.Router(),
  paper = require("../api/controllers/paper");

router.use("/paper", paper);

module.exports = router;
