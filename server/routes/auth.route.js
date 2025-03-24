const {
  register,
  verifyEmail,
  googleOAuthHandler,
  isVerified,
  refreshAccessToken,
  logout,
  resendEmail,
  dummyTokens,
} = require("../controller/auth.controller");
const { login } = require("../controller/auth.controller");

const express = require("express");
const { registerValidation } = require("../middleware/validation");
const { googleClient } = require("../utils/utils");
const isAuthenticated = require("../middleware/auth");

const router = express.Router();

// google auth
router.get("/google", (req, res) => {
  const url = googleClient.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["email", "profile"],
    redirect_uri: process.env.GOOGLE_SUCCESS_REDIRECT,
  });

  res.redirect(url);
});

router.get("/google/callback", googleOAuthHandler);

// register + login
router.post("/register", registerValidation(), register);
router.post("/login", login);

// DUMMY tokens
router.get('/dummy', dummyTokens);

// logout
router.get("/logout", isAuthenticated, logout);

// Verification
router.post("/refresh-token", refreshAccessToken);
router.post("/verify-email", verifyEmail);
router.post("/resend-email", resendEmail);
router.get("/check-verification", isVerified);

module.exports = router;
