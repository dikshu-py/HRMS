const uploadImage = (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
  
    const imageUrl = `http://localhost:3000/${req.file.filename}`;
    return res.status(200).json({ message: 'Image uploaded successfully', imageUrl });
  };
  
  module.exports = {
    uploadImage
  };
  