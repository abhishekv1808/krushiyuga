const Contact = require('../models/contactModel');

exports.getAdminLogin =(req,res, next )=>{
    res.render('../views/admin/admin-login.ejs', {pageTitle : "Admin Login | Airbnb"});
}

exports.postContactForm = (req, res,next)=>{

    const { firstName, lastName,email,  mobile, inquiryType, location,  message } = req.body;
    const contact = new Contact({
        firstName,
        lastName,
        email,
        mobile,
        inquiryType,
        location,
        message
    });
    contact.save()
        .then(() => {
            console.log('Contact saved successfully');
            res.redirect('/contact-us'); // Redirect to home page after successful submission
        })
        .catch(err => {
            console.error('Error saving contact:', err);
            res.status(500).send('Internal Server Error');
        });


}