import { register } from '../controller/auth.controller';

const express = require('express');
const router = express.Router();


// register
router.post('/register', register);

// login


export default router;