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

// Add CORS headers for CSS files
app.use((req, res, next) => {
    if (req.path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'public, max-age=31536000');
    }
    next();
});

// Security middleware with fallback
try {
    const helmet = require('helmet');
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com", "blob:", "data:"],
                fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com", "data:"],
                scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
                imgSrc: ["'self'", "data:", "https:", "blob:"],
                connectSrc: ["'self'", "https:"],
            },
        },
        crossOriginEmbedderPolicy: false,
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
    const fs = require('fs');
    const cssPath = path.join(rootDir, 'public', 'output.css');
    
    try {
        if (fs.existsSync(cssPath)) {
            res.setHeader('Content-Type', 'text/css; charset=utf-8');
            res.setHeader('Cache-Control', 'public, max-age=31536000');
            res.setHeader('Access-Control-Allow-Origin', '*');
            
            const cssContent = fs.readFileSync(cssPath, 'utf8');
            res.send(cssContent);
        } else {
            res.status(404).send('/* CSS file not found */');
        }
    } catch (error) {
        console.error('Error serving CSS:', error);
        res.status(500).send('/* CSS serving error */');
    }
});

app.get('/gallery.css', (req, res) => {
    const fs = require('fs');
    const galleryPath = path.join(rootDir, 'views', 'gallery.css');
    
    try {
        if (fs.existsSync(galleryPath)) {
            res.setHeader('Content-Type', 'text/css; charset=utf-8');
            res.setHeader('Cache-Control', 'public, max-age=31536000');
            res.setHeader('Access-Control-Allow-Origin', '*');
            
            const cssContent = fs.readFileSync(galleryPath, 'utf8');
            res.send(cssContent);
        } else {
            // Fallback CSS if file doesn't exist
            res.setHeader('Content-Type', 'text/css; charset=utf-8');
            res.send(`
                /* Gallery fallback styles */
                .gallery-hero-section { 
                    background: linear-gradient(135deg, #059669 0%, #047857 100%); 
                    min-height: 50vh; 
                }
                .gallery-card { 
                    transition: transform 0.3s ease; 
                }
                .gallery-card:hover { 
                    transform: translateY(-4px); 
                }
            `);
        }
    } catch (error) {
        console.error('Error serving gallery CSS:', error);
        res.status(500).send('/* Gallery CSS serving error */');
    }
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
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .test-box { 
                    background-color: #059669; 
                    color: white; 
                    padding: 16px; 
                    border-radius: 8px; 
                    margin: 10px 0; 
                }
                .status { color: green; }
                .error { color: red; }
            </style>
        </head>
        <body>
            <h1>🔍 CSS Debug Information</h1>
            
            <h2>📁 Files Status:</h2>
            <ul>
                <li>Output CSS exists: <span class="${fs.existsSync(cssPath) ? 'status' : 'error'}">${fs.existsSync(cssPath)}</span></li>
                <li>Gallery CSS exists: <span class="${fs.existsSync(galleryPath) ? 'status' : 'error'}">${fs.existsSync(galleryPath)}</span></li>
                <li>Output CSS size: ${fs.existsSync(cssPath) ? fs.statSync(cssPath).size + ' bytes' : 'N/A'}</li>
                <li>Public directory: ${path.join(rootDir, 'public')}</li>
                <li>Root directory: ${rootDir}</li>
            </ul>
            
            <h2>🎨 CSS Test (Inline Styles - Should be Green):</h2>
            <div class="test-box">
                ✅ This box uses inline CSS and should be GREEN with WHITE text!
            </div>
            
            <h2>🔗 CSS Test (External CSS - Should be Green if Tailwind works):</h2>
            <link rel="stylesheet" href="/output.css">
            <div class="bg-emerald-600 text-white p-4 rounded">
                ✅ If this box is GREEN with WHITE text, Tailwind CSS is working!
            </div>
            
            <h2>📋 Direct CSS Links:</h2>
            <ul>
                <li><a href="/output.css" target="_blank">📄 Direct CSS Link (/output.css)</a></li>
                <li><a href="/gallery.css" target="_blank">📄 Gallery CSS Link (/gallery.css)</a></li>
                <li><a href="/health" target="_blank">❤️ Health Check</a></li>
            </ul>
            
            <h2>🔧 Browser Console Check:</h2>
            <p>Press F12 and check the Console and Network tabs for any CSS loading errors.</p>
            
            <script>
                // Check if CSS loaded
                setTimeout(() => {
                    const testDiv = document.querySelector('.bg-emerald-600');
                    if (testDiv) {
                        const styles = window.getComputedStyle(testDiv);
                        const bgColor = styles.backgroundColor;
                        console.log('Tailwind test div background color:', bgColor);
                        if (bgColor.includes('5, 150, 105') || bgColor.includes('#059669')) {
                            console.log('✅ CSS is working!');
                        } else {
                            console.error('❌ CSS not working. Background color:', bgColor);
                        }
                    }
                }, 1000);
            </script>
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
