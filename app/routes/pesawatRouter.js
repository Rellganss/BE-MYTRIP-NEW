const router = require("express").Router();
const pesawatController = require("../controller/pesawatController");
const multer = require("../middleware/multer");

router.post(
  "/tambahpesawat",
  multer.single("pesawat_foto"),
  pesawatController.createPesawat
);

router.get("/totalpesawat", pesawatController.getAllPesawat);

router.get("/pesawat/:id", pesawatController.getPesawatById);

router.put(
  "/perbaruipesawat/:id",
  multer.single("pesawat_foto"),
  pesawatController.updatePesawat
);

router.delete("/:id", pesawatController.deletePesawat);

module.exports = router;
