const express = require("express");

const router = express.Router();
const { getme } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/verifyToken");

router.get("/getme", verifyToken, getme);
module.exports = router;
