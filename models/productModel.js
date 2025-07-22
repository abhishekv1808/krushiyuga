const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isDisplayed: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        required: true,
        enum: ['Osmanabadi Goat', 'Young Stock', 'Meat Goat', 'Other']
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
