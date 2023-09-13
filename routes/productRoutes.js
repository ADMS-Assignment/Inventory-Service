const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/allProducts', productController.getProducts);
router.get('/product/:id', productController.getProductById);
router.post('/createProduct', productController.createProduct);
router.put('/UpdateProduct/:id', productController.updateProduct);
router.patch('/reserve', productController.reserveProducts);
router.delete('/deleteProduct/:id', productController.deleteProduct);

module.exports = router;
