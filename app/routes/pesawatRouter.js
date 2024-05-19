const router = require("express").Router();
const pesawatController = require("../controller/pesawatController");
const multer = require("../middleware/multer");
const authMe = require("../middleware/authMe");
const checkRole = require("../middleware/checkRole");

router.post(
  "/tambahpesawat",
  authMe,
  multer.single("pesawat_foto"),
  pesawatController.createPesawat
);

router.get("/totalpesawat", pesawatController.getAllPesawat);

router.get("/getPesawatById/:id", authMe, pesawatController.getPesawatById);
router.get(
  "/getAllPesawatByUserId/user/:id_user",
  authMe,
  pesawatController.getAllPesawatByUserId
);

router.put(
  "/perbaruipesawat/:id",
  authMe,
  multer.single("pesawat_foto"),
  pesawatController.updatePesawat
);

router.delete("/deletepesawat/:id", authMe, pesawatController.deletePesawat);

module.exports = router;
