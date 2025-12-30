const express = require('express');
const router = express.Router();
const { register, login, verifyToken } = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../middleware/validator');
const auth = require('../middleware/auth');


router.post('/register', registerValidation, register);


router.post('/login', loginValidation, login);


router.get('/verify', auth, verifyToken);

module.exports = router;
