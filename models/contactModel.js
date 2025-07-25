const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile : {
        type: Number,
        required: true
    },
    inquiryType: {
        type: String,
        required: true,
        enum: ['Breed Stock', 'breed-stock', 'Young Stock', 'young-stock', 'Meat Stocks', 'meat-stocks', 'Farm Consultation', 'farm-consultation', 'general Inquiry', 'general-inquiry']
    },
    location :{
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
    },
    referenceNumber: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });


module.exports = mongoose.model('Contact', contactSchema);