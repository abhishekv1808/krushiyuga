const express = require('express');
const userRouter = express.Router();
const {getHome, getContactPage, submitContact, getOsmanabadiBreed,getProducts, getGallery, getAboutUs, getSubsidy } = require('../controllers/userController');


userRouter.get('/', getHome);
userRouter.get('/contact-us', getContactPage);
userRouter.post('/contact-us', submitContact);
userRouter.get('/osmanabadi-goat',getOsmanabadiBreed )
userRouter.get('/products',getProducts );
userRouter.get('/gallery', getGallery );

userRouter.get('/aboutUs', getAboutUs );
userRouter.get('/subsidy', getSubsidy );
 
 


module.exports = userRouter;
