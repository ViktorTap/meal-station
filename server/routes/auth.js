const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/", authController.handleLogin);

// /profile

module.exports = router;
