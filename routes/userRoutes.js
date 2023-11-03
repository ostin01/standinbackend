const express = require("express");

const router = express.Router();
const { register, login } = require("../controllers/userControllers");

// const { protect } = require("../middleware/authmiddleware");
router.post("/register", register);
router.post("/login", login);
// router.get("/me", protect, getMe);
module.exports = router;
