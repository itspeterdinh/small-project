const express = require('express');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/logout', authController.logout);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/verifyToken', authController.verifyToken);

module.exports = router;
