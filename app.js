require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const rootDir = require('./utils/mainUtils');
const mongoose = require('mongoose');
const Admin = require('./models/adminModel');

const app = express();

// Security middleware with fallback
try {
    const helmet = require('helmet');
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
} catch (error) {
    console.warn('Helmet not available, using basic security headers');
    // Basic security headers fallback
    app.use((req, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        next();
    });
}

// Compression middleware
app.use(compression());

app.set('view engine', 'ejs');
app.set('views', 'views');

// Ensure uploads directory exists
const uploadsDir = path.join(rootDir, 'public', 'uploads', 'products');
if (!require('fs').existsSync(uploadsDir)) {
    require('fs').mkdirSync(uploadsDir, { recursive: true });
}

// Static file serving with proper headers for CSS
app.use('/public', express.static(path.join(rootDir, 'public'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

// Serve CSS files directly from root for compatibility
app.use(express.static(path.join(rootDir, 'public'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
            res.setHeader('Cache-Control', 'public, max-age=31536000');
        }
    }
}));
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

// Explicit CSS serving routes for Render compatibility
app.get('/output.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.sendFile(path.join(rootDir, 'public', 'output.css'));
});

app.get('/gallery.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.sendFile(path.join(rootDir, 'views', 'gallery.css'));
});

// CSS debug route for troubleshooting
app.get('/css-debug', (req, res) => {
    const fs = require('fs');
    const cssPath = path.join(rootDir, 'public', 'output.css');
    const galleryPath = path.join(rootDir, 'views', 'gallery.css');
    
    res.setHeader('Content-Type', 'text/html');
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>CSS Debug - Krushiyuga</title>
        </head>
        <body>
            <h1>CSS Debug Information</h1>
            <h2>Files Status:</h2>
            <ul>
                <li>Output CSS exists: ${fs.existsSync(cssPath)}</li>
                <li>Gallery CSS exists: ${fs.existsSync(galleryPath)}</li>
                <li>Output CSS size: ${fs.existsSync(cssPath) ? fs.statSync(cssPath).size + ' bytes' : 'N/A'}</li>
                <li>Public directory: ${path.join(rootDir, 'public')}</li>
            </ul>
            <h2>CSS Test:</h2>
            <link rel="stylesheet" href="/output.css">
            <div class="bg-emerald-600 text-white p-4 rounded">
                If this box is green with white text, CSS is working!
            </div>
            <h2>Direct CSS Links:</h2>
            <ul>
                <li><a href="/output.css" target="_blank">Direct CSS Link</a></li>
                <li><a href="/gallery.css" target="_blank">Gallery CSS Link</a></li>
            </ul>
        </body>
        </html>
    `);
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

    app.listen(port, '0.0.0.0', () => {
        console.log(`Server is running on port ${port}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`Health check available at: /health`);
        if (process.env.NODE_ENV !== 'production') {
            console.log(`Development URL: http://localhost:${port}`);
        }
    });
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
});
