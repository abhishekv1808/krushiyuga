const express = require('express');
const router = express.Router();
const upload = require('../utils/uploadUtils');
const { 
    isAuthenticated,
    getLogin,
    postLogin,
    logout,
    getDashboard,
    getProducts,
    getInquiries
} = require('../controllers/adminController');

const {
    addProduct,
    updateProduct,
    deleteProduct,
    toggleDisplayStatus,
    getProduct // Import the getProduct function
} = require('../controllers/productController');

// Auth routes
router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/logout', isAuthenticated, logout);

// Dashboard
router.get('/dashboard', isAuthenticated, getDashboard);

// Product management
router.get('/products', isAuthenticated, getProducts);
router.get('/products/:id', isAuthenticated, getProduct); // Add this line
router.post('/products', isAuthenticated, upload.single('productImage'), addProduct);
router.post('/products/:id', isAuthenticated, upload.single('productImage'), updateProduct);
router.delete('/products/:id', isAuthenticated, deleteProduct);
router.post('/products/:id/toggle-display', isAuthenticated, toggleDisplayStatus);

// Inquiry management
router.get('/inquiries', isAuthenticated, getInquiries);

module.exports = router;


