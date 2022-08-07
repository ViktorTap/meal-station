const express = require("express");
const router = express.Router(); // Router = function !!!
const dishController = require("../controllers/dishController");

router.post("/:id/menu/create", dishController.createNewDish);
// router.get("/all", registerController.getAllRestaurants);
router.get("/:id/menu/:id", dishController.getDish);
router.get("/:id/menu", dishController.getAllByRestaurantId);

module.exports = router;
