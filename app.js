require('dotenv').config();
const express = require('express');
const path = require('path');
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const rootDir = require('./utils/mainUtils');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(rootDir, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add this line for parsing JSON requests

app.use(userRouter);
app.use(adminRouter);

// Production configurations
const port = process.env.PORT || 3000;
const dbUrl = process.env.MONGODB_URI || 'mongodb+srv://abhishekv1808:' + encodeURIComponent('Grow@$@2025') + '@aribnb.xvmlcnz.mongodb.net/krushiyuga?retryWrites=true&w=majority&appName=aribnb';

// Security middleware
app.use(helmet()); // Add security headers
app.use(compression()); // Compress responses

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

mongoose.connect(dbUrl).then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
    console.log(`Server is running on port : http://localhost:${port}`);
});
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process if connection fails
}   );

