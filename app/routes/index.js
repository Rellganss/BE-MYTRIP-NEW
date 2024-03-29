const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../docs/swagger.json");
const pesawat = require("./pesawatRouter");
const hotel = require("./hotelRouter");
const Auth = require("./authRouter");

router.use("/api/v1/pesawat", pesawat);
router.use("/api/v1/hotel", hotel);
router.use("/api/v1/auth", Auth);
router.use("/api-docs", swaggerUi.serve);
router.use("/api-docs", swaggerUi.setup(swaggerDocument));

module.exports = router;
