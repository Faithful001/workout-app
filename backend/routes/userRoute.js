const { loginUser, signupUser } = require("../controllers/userController");

const express = require("express");

const router = express.Router();

router.post("/login", loginUser);

router.post("/signupUser", signupUser);

module.exports = router;
