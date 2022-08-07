const express = require("express");
const router = express.Router(); // Router = function !!!
const orderController = require("../controllers/orderController");

router.put("/:id/cart", orderController.createNewOrder);

module.exports = router;
