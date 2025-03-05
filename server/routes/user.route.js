const express = require('express');
const { profileInfo } = require('../controller/user.controller');
const isAuthenticated = require('../middleware/auth');
const router = express.Router();

router.get('/profile', isAuthenticated, profileInfo);

module.exports = router;