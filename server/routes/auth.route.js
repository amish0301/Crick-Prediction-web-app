const { register } = require("../controller/auth.controller");

const express = require("express");
const { registerValidation } = require("../middleware/validation");
const router = express.Router();

// register
router.post("/register", registerValidation(), register);

// login
// router.post("/login", login);

module.exports = router
