const express = require("express");
const router = express.Router(); // Router = function !!!
const registerController = require("../controllers/restaurantController");

router.post("/register-restaurant", registerController.createNewRestaurant);
router.get("/all", registerController.getAllRestaurants);
router.get("/:id", registerController.getRestaurant);
router.put("/:id/add-order", registerController.addNewOrder);
router.delete("/:id/delete", registerController.deleteRestaurant);

module.exports = router;
