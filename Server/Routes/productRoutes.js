const express = require('express');
const router = express.Router();
const productController = require('../Controllers/productController');
const authMiddleware = require('../Middleware/auth');


// Define routes
router.post('/add-products', productController.addProduct);
router.get('/products', productController.getAllProducts);



router.use(authMiddleware); // below this all will have to require jwt token 
router.get('/detail/:id', productController.getProductById);
router.put('/edit/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;
