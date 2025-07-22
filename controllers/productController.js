const Product = require('../models/productModel');
const upload = require('../utils/uploadUtils');
const fs = require('fs');
const path = require('path');

exports.addProduct = async (req, res) => {
    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'Please upload an image' });
        }

        const imageUrl = `/uploads/products/${req.file.filename}`;
        const { 
            name, 
            category, 
            price, 
            quantity, 
            age, 
            weight, 
            description,
            isDisplayed 
        } = req.body;

        const product = new Product({
            name,
            category,
            price,
            quantity,
            age,
            weight,
            description,
            imageUrl,
            isDisplayed: isDisplayed === 'on'
        });

        await product.save();
        res.redirect('/admin/products');
    } catch (error) {
        console.error('Error adding product:', error);
        // Delete uploaded file if there was an error
        if (req.file) {
            fs.unlink(path.join(__dirname, '../public', req.file.path), (err) => {
                if (err) console.error('Error deleting file:', err);
            });
        }
        res.status(500).send('Error adding product');
    }
};

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Error fetching product details' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updateData = { ...req.body };

        // If a new file was uploaded
        if (req.file) {
            // Delete old image if it exists
            const oldProduct = await Product.findById(productId);
            if (oldProduct && oldProduct.imageUrl) {
                const oldImagePath = path.join(__dirname, '../public', oldProduct.imageUrl);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            updateData.imageUrl = `/uploads/products/${req.file.filename}`;
        }

        // Handle boolean field
        updateData.isDisplayed = updateData.isDisplayed === 'on';

        const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.redirect('/admin/products');
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Error updating product');
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Delete the image file if it exists
        if (product.imageUrl) {
            const imagePath = path.join(__dirname, '../public', product.imageUrl);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Error deleting product' });
    }
};

exports.toggleDisplayStatus = async (req, res) => {
    try {
        const { isDisplayed } = req.body;
        await Product.findByIdAndUpdate(req.params.id, { isDisplayed });
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error toggling display status:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
