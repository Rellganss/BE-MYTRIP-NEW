const router = require("express").Router();

const Auth = require("../controller/authController");
const validateEmail = require("../middleware/validateEmail");

router.post("/register", validateEmail, Auth.register);
router.post("/login", Auth.login);
router.post("/forgot-password", Auth.forgotPassword);
router.post("/topup", Auth.topUp);
router.post("/send-email-forgot-password", Auth.sendEmailForgotPassword);

module.exports = router;
