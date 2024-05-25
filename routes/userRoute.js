const express = require("express");

const router = express.Router();
const { getme } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/verifyToken");
const { getAllUsers } = require("../controllers/userController");

router.get("/getme", verifyToken, getme);
router.get("/all-users", getAllUsers);
module.exports = router;
