const express = require('express');
const router = express.Router();
const messageController = require('../Controllers/messageController');


router.get("/message/:id", messageController.getAllMessage);
router.post("/message/:id", messageController.sendMessage);




module.exports = router