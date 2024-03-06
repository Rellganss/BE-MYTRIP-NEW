const router = require("express").Router();

const Auth = require("../controller/authController");
const validateEmail = require("../middleware/validateEmail");

router.post("/register", validateEmail, Auth.register);
router.post("/login", Auth.login);

module.exports = router;
