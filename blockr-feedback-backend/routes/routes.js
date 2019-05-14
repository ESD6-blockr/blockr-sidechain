const express = require("express"),
  router = express.Router(),
  paper = require("../api/controllers/paper"),
  user = require('../api/controllers/user');

router.use("/paper", paper);
router.use("/user", user);

module.exports = router;
