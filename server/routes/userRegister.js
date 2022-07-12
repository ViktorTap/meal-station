const express = require("express");
const router = express.Router(); // Router = function !!!
const registerController = require("../controllers/userRegisterController");

router.post("/", registerController.handleNewUser);

module.exports = router;
