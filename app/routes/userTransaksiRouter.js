const router = require("express").Router();
const UserTransaksi = require("../controller/userTransaksiController");
const authMe = require("../middleware/authMe");

router.get("/getUserTransaksi", authMe, UserTransaksi.getUserTransaksi);
router.delete(
  "/deleteUserTransaksi/:id",
  authMe,
  UserTransaksi.deleteUserTransaksi
);
router.put(
  "/updateUserTransaksi/:id",
  authMe,
  UserTransaksi.updateUserTransaksi
);

module.exports = router;
