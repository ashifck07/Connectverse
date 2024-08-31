const express = require('express');
const { registerUser, loginUser} = require('../Controller/Controller');
const { forgotPassword,resetPassword} = require('../Controller/PasswordController');
const router = express.Router();
router.post('/register', registerUser)
router.post('/login',loginUser)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword);

module.exports = router;