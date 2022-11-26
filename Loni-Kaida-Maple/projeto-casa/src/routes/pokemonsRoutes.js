//Dependencias//
const controller = require("../controllers/pokemonsController");
const express = require("express");

//Router//
const router = express.Router();

//Rotas//
router.get("/", controller.all);
router.get("/id:", controller.findById);
router.get("/id:", controller.filterByTrainerName);

router.post("/new", controller.create);

router.delete("/release/:id", controller.release);

module.exports = router;