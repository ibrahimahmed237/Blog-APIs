const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
// const isAuth = require("../middlewares/is-auth");

// POST /auth/signup
router.post("/signup", authController.signup);

// POST /auth/login
router.post("/login", authController.login);




module.exports = router;
