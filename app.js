require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const compression = require('compression');
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const rootDir = require('./utils/mainUtils');
const mongoose = require('mongoose');
const Admin = require('./models/adminModel');

const app = express();

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

// Compression middleware
app.use(compression());

app.set('view engine', 'ejs');
app.set('views', 'views');

// Ensure uploads directory exists
const uploadsDir = path.join(rootDir, 'public', 'uploads', 'products');
if (!require('fs').existsSync(uploadsDir)) {
    require('fs').mkdirSync(uploadsDir, { recursive: true });
}


app.use(express.static(path.join(rootDir, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

app.use(userRouter);
app.use('/admin', adminRouter);


const port = process.env.PORT || 3000;

// Validate required environment variables
if (!process.env.MONGODB_USERNAME || !process.env.MONGODB_PASSWORD || !process.env.MONGODB_CLUSTER) {
    console.error('Error: Missing required environment variables. Please check your .env file.');
    console.error('Required: MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_CLUSTER');
    process.exit(1);
}

const dbUrl = `mongodb+srv://${process.env.MONGODB_USERNAME}:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE || 'krushiyuga'}?retryWrites=true&w=majority&appName=krushiyuga`;

mongoose.connect(dbUrl).then(async () => {
    console.log('Connected to MongoDB');

    // Create default admin user if not exists
    try {
        if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
            console.error('Warning: ADMIN_EMAIL and ADMIN_PASSWORD must be set in environment variables for production');
            return;
        }

        const defaultAdminEmail = process.env.ADMIN_EMAIL;
        const adminExists = await Admin.findOne({ email: defaultAdminEmail });
        if (!adminExists) {
            await Admin.create({
                email: defaultAdminEmail,
                password: process.env.ADMIN_PASSWORD,
                firstName: process.env.ADMIN_FIRSTNAME || 'Admin',
                lastName: process.env.ADMIN_LASTNAME || 'User'
            });
            console.log('Default admin user created');
        }
    } catch (error) {
        console.error('Error creating admin user:', error);
    }

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        if (process.env.NODE_ENV !== 'production') {
            console.log(`Development URL: http://localhost:${port}`);
        }
    });
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
});
