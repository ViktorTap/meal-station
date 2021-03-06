const express = require("express");
const router = express.Router(); // Router = function !!!
const registerController = require("../controllers/restaurantController");

router.post("/register-restaurant", registerController.createNewRestaurant);
router.get("/all", registerController.getAllRestaurants);
router.get("/:id", registerController.getRestaurant);

module.exports = router;
