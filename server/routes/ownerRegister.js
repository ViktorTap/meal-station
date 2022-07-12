const express = require("express");
const router = express.Router(); // Router = function !!!
const registerController = require("../controllers/ownerRegisterController");

router.post("/", registerController.handleNewOwner);

module.exports = router;
