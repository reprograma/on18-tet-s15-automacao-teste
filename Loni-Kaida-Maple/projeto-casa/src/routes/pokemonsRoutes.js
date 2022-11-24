//Dependencias//
const controller = require("../controllers/pokemonsController");
const express = require("express");

//Router//
const router = express.Router();

//Rotas//
router.get("/", controller.all)

router.post("/new", controller.create)

module.exports = router;