const router = require("express").Router();
const pesawatController = require("../controller/pesawatController");
const multer = require("../middleware/multer");
const authMe = require("../middleware/authMe");
const checkRole = require("../middleware/checkRole");

router.post(
  "/tambahpesawat",
  authMe,
  checkRole(["mitra"]),
  multer.single("pesawat_foto"),
  pesawatController.createPesawat
);

router.get("/totalpesawat", authMe, pesawatController.getAllPesawat);

router.get("/getPesawatById/:id", authMe, pesawatController.getPesawatById);
router.get(
  "/getAllPesawatByUserId/user/:id_user",
  authMe,
  checkRole(["admin", "mitra"]),
  pesawatController.getAllPesawatByUserId
);

router.put(
  "/perbaruipesawat/:id",
  authMe,
  checkRole(["mitra"]),
  multer.single("pesawat_foto"),
  pesawatController.updatePesawat
);

router.delete(
  "/deletepesawat/:id",
  authMe,
  checkRole(["mitra"]),
  pesawatController.deletePesawat
);

module.exports = router;
