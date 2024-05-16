const router = require("express").Router();

const Reservasi = require("../controller/reservasiController");
const authMe = require("../middleware/authMe");

router.post("/reservations", authMe, Reservasi.createReservation);

router.get("/reservations", authMe, Reservasi.getAllReservations);

router.get("/reservations/:id", authMe, Reservasi.getReservationById);

router.put("/reservations/:id", authMe, Reservasi.updateReservation);

router.delete("/reservations/:id", authMe, Reservasi.deleteReservation);

module.exports = router;
