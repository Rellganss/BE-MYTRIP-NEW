const router = require("express").Router();
const hotelController = require("../controller/hotelController");
const multer = require("../middleware/multer");
const checkRole = require("../middleware/checkRole");
const authenticate = require("../middleware/authMe");

router.post(
  "/tambahhotel",
  authenticate,
  multer.single("hotel_foto"),
  hotelController.createHotel
);
router.post("/tambahfasilitas", hotelController.addFacility);
router.get("/fasilitas", hotelController.getAllFacility);
router.get("/totalhotel", hotelController.getAllHotel);
router.get("/getHotelById/:id", hotelController.getHotelById);
router.put(
  "/perbaruihotel/:id",
  authenticate,
  multer.single("hotel_foto"),
  hotelController.updateHotel
);
router.delete("/deletehotel/:id", hotelController.deleteHotel);

module.exports = router;
