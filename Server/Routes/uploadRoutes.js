const express = require('express');
const router = express.Router();
const upload = require('../Models/multer');
const { uploadImage } = require('../Controllers/uploadController');

// POST /upload
router.post('/upload', upload.single('image'), uploadImage);

module.exports = router;
