const controller = require("../controllers/produtosController");
const express = require("express");

const router = express.Router();

router.get("/buscar/all", controller.all);
router.get("/buscar/:id", controller.findOne);
router.post("/create", controller.create);
router.put("/update/:id", controller.update);
router.delete("/delete/:id", controller.remove);

module.exports = router;
