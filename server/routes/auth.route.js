const { register, verifyEmail, googleOAuthHandler } = require("../controller/auth.controller");
const { login } = require("../controller/auth.controller");

const express = require("express");
const { registerValidation } = require("../middleware/validation");
const { googleClient } = require("../utils/utils");

const router = express.Router();

// google auth
router.get("/google", (req, res) => {
  const url = googleClient.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email"],
  });

  res.redirect(url);
});

router.get("/google/callback", googleOAuthHandler);

// register
router.post("/register", registerValidation(), register);
// login
router.post("/login", login);
router.post("/verify-email", verifyEmail);

module.exports = router;
