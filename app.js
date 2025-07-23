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

// Enhanced static file serving with proper MIME types and caching
app.use(express.static(path.join(rootDir, 'public'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css; charset=utf-8');
            res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year cache for CSS
            res.setHeader('Access-Control-Allow-Origin', '*');
        }
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
            res.setHeader('Cache-Control', 'public, max-age=31536000');
        }
        if (path.match(/\.(png|jpg|jpeg|gif|svg|ico)$/)) {
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

// CSS status check endpoint
app.get('/css-status', (req, res) => {
    const fs = require('fs');
    const path = require('path');
    
    try {
        const outputCssExists = fs.existsSync(path.join(__dirname, 'public', 'output.css'));
        const galleryCssExists = fs.existsSync(path.join(__dirname, 'public', 'gallery.css'));
        const outputCssSize = outputCssExists ? fs.statSync(path.join(__dirname, 'public', 'output.css')).size : 0;
        const galleryCssSize = galleryCssExists ? fs.statSync(path.join(__dirname, 'public', 'gallery.css')).size : 0;
        
        res.json({
            status: 'CSS Status Check',
            files: {
                'output.css': {
                    exists: outputCssExists,
                    size: outputCssSize,
                    url: `http://localhost:3000/output.css?v=${Date.now()}`
                },
                'gallery.css': {
                    exists: galleryCssExists,
                    size: galleryCssSize,
                    url: `http://localhost:3000/gallery.css?v=${Date.now()}`
                }
            },
            cacheBuster: Date.now(),
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CSS test page
app.get('/test-css', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CSS Test - Krushiyuga</title>
        <link rel="stylesheet" href="/output.css?v=${Date.now()}">
        <link rel="stylesheet" href="/gallery.css?v=${Date.now()}">
        <style>
            body { margin: 20px; font-family: system-ui; }
            .test-card { margin: 20px 0; padding: 20px; border: 1px solid #ccc; }
        </style>
    </head>
    <body>
        <h1>🎨 CSS Loading Test for Krushiyuga</h1>
        
        <div class="test-card">
            <h2>1. Basic Tailwind Test</h2>
            <div class="bg-green-600 text-white p-4 rounded-lg shadow-lg">
                <p class="text-xl font-bold">✅ If this box is GREEN with white text, Tailwind CSS is working!</p>
            </div>
        </div>
        
        <div class="test-card">
            <h2>2. Custom Button Test</h2>
            <button class="btn-primary mr-4">Primary Button</button>
            <button class="btn-secondary">Secondary Button</button>
            <p><small>✅ These should be styled green and gray buttons if custom CSS is working</small></p>
        </div>
        
        <div class="test-card">
            <h2>3. Gallery CSS Test</h2>
            <div class="gallery-hero-section text-white p-6 rounded-lg">
                <h3 class="text-2xl font-bold">Gallery Hero Section</h3>
                <p>✅ If this has a green gradient background, gallery.css is working!</p>
            </div>
        </div>
        
        <div class="test-card">
            <h2>4. Advanced Tailwind Test</h2>
            <div class="grid grid-cols-3 gap-4">
                <div class="bg-blue-500 p-4 rounded text-white text-center">Blue</div>
                <div class="bg-red-500 p-4 rounded text-white text-center">Red</div>
                <div class="bg-yellow-500 p-4 rounded text-white text-center">Yellow</div>
            </div>
        </div>
        
        <div class="test-card">
            <h2>5. CSS File Information</h2>
            <p><strong>CSS Files:</strong></p>
            <ul>
                <li>📄 output.css: ${require('fs').statSync('./public/output.css').size} bytes</li>
                <li>📄 gallery.css: ${require('fs').statSync('./public/gallery.css').size} bytes</li>
            </ul>
            <p><strong>Cache Buster:</strong> ${Date.now()}</p>
        </div>
        
        <div class="test-card">
            <h2>6. Debug Information</h2>
            <button onclick="location.reload()" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                🔄 Force Reload
            </button>
            <button onclick="window.open('/output.css?v=' + Date.now(), '_blank')" 
                    class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ml-2">
                📄 View output.css
            </button>
            <button onclick="window.open('/gallery.css?v=' + Date.now(), '_blank')" 
                    class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 ml-2">
                📄 View gallery.css
            </button>
        </div>
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
