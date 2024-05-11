const router = require("express").Router();

const Auth = require("../controller/authController");
const validateEmail = require("../middleware/validateEmail");
const authMe = require("../middleware/authMe");

router.post("/admit/login", Auth.authenticateAdminMitra);

router.post("/member/register", validateEmail, Auth.register);
router.post("/member/login", Auth.login);
router.post("/forgot-password", Auth.forgotPassword);
router.get("/me", authMe, Auth.authenticate);
router.post("/topup", Auth.topUp);
router.post("/send-email-forgot-password", Auth.sendEmailForgotPassword);

module.exports = router;
