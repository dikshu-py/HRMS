const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Absolute path to uploads folder
const uploadDir = path.join(__dirname, '..', 'uploads');

// Create uploads folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Created uploads directory at:', uploadDir);
}

// Define storage for the images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Export multer middleware
const upload = multer({ storage: storage });

module.exports = upload;
