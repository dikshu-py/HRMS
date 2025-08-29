const express = require('express');
const router = express.Router();
const authController = require('../Controllers/loginController');

router.post('/login', authController.login);
router.post('/register',authController.register)
router.get('/allusers',authController.allUsers)
router.put('/updateprofile',authController.updateUser)
module.exports = router;
