const router = require("express").Router();

const Auth = require("../controller/authController");
const validateEmail = require("../middleware/validateEmail");
const authMe = require("../middleware/authMe");
const checkRole = require("../middleware/checkRole");

router.post("/admit/login", Auth.authenticateAdminMitra);

router.post("/member/register", validateEmail, Auth.register);
router.post("/member/login", Auth.login);
router.post("/forgot-password", Auth.forgotPassword);
router.get("/me", authMe, Auth.authenticate);
router.post("/topup/:userId", Auth.topUp);
router.post("/admin/subtractBalance", authMe, Auth.subtractBalance);
router.post("/send-email-forgot-password", Auth.sendEmailForgotPassword);

router.post("/admin/registerMitra", validateEmail, Auth.registerMitra);

router.put("/admin/editUser/:id", authMe, checkRole(["admin"]), Auth.editUser);
router.delete("/admin/deleteUser/:id", authMe, Auth.deleteUser);
router.get("/admin/getUsersByRole/:role", authMe, Auth.getUsersByRole);

module.exports = router;
