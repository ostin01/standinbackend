const express = require("express");

const router = express.Router();
const { register, login } = require("../controllers/authController");

router.post("/register-user", register);
router.post("/login-user", login);
module.exports = router;
