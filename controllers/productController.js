const Product = require('../models/productModel');

const productController = {
    getProducts: async (req, res) => {
        try {
            const products = await Product.find({});
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getProductById: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createProduct: async (req, res) => {
        try {
            const product = await Product.create(req.body);
            res.status(200).json({ message: "Product added successfully", product });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: error.message });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.findByIdAndUpdate(id, req.body);
            if (!product) {
                return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
            }
            const updatedProduct = await Product.findById(id);
            res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.findByIdAndDelete(id);
            if (!product) {
                return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
            }
            res.status(200).json({ message: "Product deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    reserveProducts: async (req, res) => {
        try {
            const { products } = req.body;
    
            // Validate the product IDs
            const productIds = products.map((product) => product.productId);
            const existingProducts = await Product.find({ _id: { $in: productIds } });
    
            // Check if all product IDs are valid
            if (existingProducts.length !== products.length) {
                return res.status(400).json({ message: "Some product IDs are invalid" });
            }
    
            // Reserve the products and update the stock
            for (const requestedProduct of products) {
                const existingProduct = existingProducts.find((p) => p._id.toString() === requestedProduct.productId);
    
                if (existingProduct.quantity < requestedProduct.quantity) {
                    return res.status(400).json({ message: `Not enough stock for product ID ${existingProduct._id}` });
                }
    
                existingProduct.quantity -= requestedProduct.quantity;
                await existingProduct.save();
            }
    
            res.status(200).json({ message: "Products reserved successfully" });
        } catch (error) {
            res.status(500).json({ error,message: error.message });
        }
    },    
};

module.exports = productController;
