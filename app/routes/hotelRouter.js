const router = require("express").Router();
const hotelController = require("../controller/hotelController");
const multer = require("../middleware/multer");
const checkRole = require("../middleware/checkRole");
const authenticate = require("../middleware/authMe");

router.post(
  "/tambahhotel",
  authenticate,
  checkRole(["mitra"]),
  multer.single("hotel_foto"),
  hotelController.createHotel
);
router.get("/totalhotel", hotelController.getAllHotel);
router.get("/hotel/:id", hotelController.getHotelById);
router.put(
  "/perbaruihotel/:id",
  authenticate,
  checkRole(["mitra", "admin"]),
  multer.single("hotel_foto"),
  hotelController.updateHotel
);
router.delete("/:id", hotelController.deleteHotel);

module.exports = router;
