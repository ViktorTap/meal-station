const express = require("express");
const router = express.Router(); // Router = function !!!
const refreshTokenController = require("../controllers/refreshTokenController");

router.get("/", refreshTokenController.handleRefreshToken);

module.exports = router;
