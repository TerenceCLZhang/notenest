const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

// Register route
router.post("/register", authController.register);

// Login route
router.post("/login", authController.login);

// Create new access token route
router.post("/token", authController.token);

// Logout route
router.delete("/logout", authController.logout);

module.exports = router;
