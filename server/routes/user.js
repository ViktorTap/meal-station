const express = require("express");
const router = express.Router(); // Router = function !!!
const userController = require("../controllers/userController");

router.get("/all", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.get("/:id/restaurants", userController.getOwnerRestaurant);
router.patch("/:id", userController.updateUser);

module.exports = router;
