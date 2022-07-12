const express = require("express");
const router = express.Router(); // Router = function !!!
const Controller = require("../controllers/categoryController");

router.get("/cafe", Controller.findByCafe);
router.get("/asian", Controller.findByAsian);
router.get("/buffet", Controller.findByBuffet);
router.get("/burgers", Controller.findByBurgers);
router.get("/family-style", Controller.findByFamilyStyle);
router.get("/fast-food", Controller.findByFastFood);
router.get("/fine-dining", Controller.findByFineDining);
router.get("/mediterranean", Controller.findByMediterranean);
router.get("/pastries", Controller.findByPastries);
router.get("/pizzeria", Controller.findByPizzeria);

module.exports = router;
