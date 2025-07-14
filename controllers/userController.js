const Contact = require('../models/contactModel');
const { sendContactFormEmail } = require('../utils/emailUtils');

exports.getHome = (req,res,next) =>{
    res.render('../views/user/home.ejs', {pageTitle : "Home Page | Krushiyuga"});
}

exports.getContactPage = (req, res,next) =>{
res.render('../views/user/contactUs.ejs', {pageTitle : "Contact Us | Krushiyuga"});
}


exports.getOsmanabadiBreed = (req,res,next)=>{
    res.render('../views/user/osmanabadi-goat.ejs', {pageTitle : "Osmanabadi Breed | Krushiyuga"});
}

exports.getProducts = (req, res,next) =>{
    res.render('../views/user/products.ejs', {pageTitle : "Our Products | Krushiyuga"});
}

exports.getGallery = (req, res,next) =>{
    res.render('../views/user/gallery.ejs', {pageTitle : "Gallery | Krushiyuga"});
}

exports.getAboutUs = (req, res,next) =>{
    res.render('../views/user/aboutUs.ejs', {pageTitle : "About Us | Krushiyuga"});
}

exports.getSubsidy = (req, res,next) =>{
    res.render('../views/user/subsidy.ejs', {pageTitle : "Subsidy NLM| Krushiyuga"});
}

exports.submitContact = async (req, res, next) => {
    try {
        // Create new contact entry
        const contactData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            mobile: req.body.mobile,
            inquiryType: req.body.inquiryType,
            location: req.body.location,
            message: req.body.message
        };

        const contact = new Contact(contactData);
        await contact.save();

        // Send email notification
        const emailResult = await sendContactFormEmail(contactData);
        
        if (!emailResult.success) {
            console.error('Email sending failed:', emailResult.error);
        }

        // Generate a reference number (timestamp + random number)
        const referenceNumber = `KY${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000)}`;

        // Render the success page
        res.render('../views/user/contactSuccessful.ejs', {
            pageTitle: 'Submission Successful | Krushiyuga',
            referenceNumber: referenceNumber
        });
    } catch (error) {
        console.error('Contact submission error:', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again later.',
            error: error.message
        });
    }
};
