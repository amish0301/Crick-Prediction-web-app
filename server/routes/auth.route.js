const { register, verifyEmail } = require("../controller/auth.controller");
const { login } = require("../controller/auth.controller"); 

const express = require("express");
const { registerValidation } = require("../middleware/validation");
const router = express.Router();

// register
router.post("/register", registerValidation(), register);

// login
router.post("/login", login);

router.post("/verify-email", verifyEmail);

module.exports = router
