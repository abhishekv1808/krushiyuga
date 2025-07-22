const Admin = require('../models/adminModel');
const Product = require('../models/productModel');
const Contact = require('../models/contactModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Authentication middleware
exports.isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.adminToken;
        if (!token) {
            return res.redirect('/admin/login');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        req.admin = await Admin.findById(decoded.id);
        next();
    } catch (error) {
        res.redirect('/admin/login');
    }
};

// Auth Controllers
exports.getLogin = (req, res) => {
    res.render('admin/login', {
        pageTitle: 'Admin Login | Krushiyuga',
        error: null
    });
};

exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin || !(await admin.comparePassword(password))) {
            return res.render('admin/login', {
                pageTitle: 'Admin Login | Krushiyuga',
                error: 'Invalid email or password'
            });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'your-secret-key', {
            expiresIn: '1d'
        });

        res.cookie('adminToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.redirect('/admin/dashboard');
    } catch (error) {
        res.render('admin/login', {
            pageTitle: 'Admin Login | Krushiyuga',
            error: 'Something went wrong'
        });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('adminToken');
    res.redirect('/admin/login');
};

// Dashboard Controller
exports.getDashboard = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        const contacts = await Contact.find().sort({ createdAt: -1 }).limit(5);
        const totalProducts = await Product.countDocuments();
        const totalInquiries = await Contact.countDocuments();

        res.render('admin/dashboard', {
            pageTitle: 'Admin Dashboard | Krushiyuga',
            products,
            contacts,
            totalProducts,
            totalInquiries,
            admin: req.admin
        });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Product Controllers
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.render('admin/products', {
            pageTitle: 'Manage Products | Krushiyuga',
            products,
            admin: req.admin
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Server Error');
    }
};

// Toggle product display status
exports.toggleProductDisplay = async (req, res) => {
    try {
        const { id } = req.params;
        const { isDisplayed } = req.body;
        
        await Product.findByIdAndUpdate(id, { isDisplayed });
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error toggling product display:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.addProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.redirect('/admin/products');
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

exports.updateProduct = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/admin/products');
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/admin/products');
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

exports.toggleProductDisplay = async (req, res) => {
    try {
        const { id } = req.params;
        const { isDisplayed } = req.body;
        
        await Product.findByIdAndUpdate(id, { isDisplayed });
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error toggling product display:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Inquiry Controllers
exports.getInquiries = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.render('admin/inquiries', {
            pageTitle: 'Manage Inquiries | Krushiyuga',
            contacts,
            admin: req.admin
        });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};