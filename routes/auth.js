const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const isAuth = require("../middlewares/is-auth");

// POST /auth/signup
router.post("/signup", authController.signup);

// POST /auth/login
router.post("/login", authController.login);

router.post("/logout", isAuth, authController.logout);

//GET /auth/status
router.get("/status", isAuth, authController.getStatus);

//PUT /auth/status
router.put("/status", isAuth, authController.updateStatus);

module.exports = router;
