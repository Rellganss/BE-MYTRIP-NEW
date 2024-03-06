const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../docs/swagger.json");

const Auth = require("./authRouter");

router.use("/api/v1/auth", Auth);
router.use("/api-docs", swaggerUi.serve);
router.use("/api-docs", swaggerUi.setup(swaggerDocument));

module.exports = router;
