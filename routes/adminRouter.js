const express = require('express');
const adminRouter = express.Router();
const {getAdminLogin, postContactForm} = require('../controllers/adminController');


adminRouter.get('/admin-login', getAdminLogin);


adminRouter.post('/contact-us', postContactForm);


module.exports = adminRouter;


