const router = require("express").Router();
const hotelController = require("../controller/hotelController");
const multer = require("../middleware/multer");

router.post(
  "/tambahhotel",
  multer.single("hotel_foto"),
  hotelController.createHotel
);
router.get("/totalhotel", hotelController.getAllHotel);
router.get("/hotel/:id", hotelController.getHotelById);
router.put(
  "/perbaruihotel/:id",
  multer.single("hotel_foto"),
  hotelController.updateHotel
);
router.delete("/:id", hotelController.deleteHotel);

module.exports = router;
