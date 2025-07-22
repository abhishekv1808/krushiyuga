# Krushiyuga - Livestock Website 🐄

A professional livestock website built with Node.js, Express, MongoDB, and Tailwind CSS for showcasing goats, hens, pigs and providing agricultural information.

## 🚀 Production Deployment

### Quick Deploy on VPS

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd krushiyuga-website
```

2. **Run the production deployment script:**
```bash
chmod +x production-deploy.sh
sudo ./production-deploy.sh
```

3. **Configure environment variables:**
```bash
cp .env.example .env
nano .env
```
```bash
# Build CSS
npm run build

# Start development server
npm run dev

# Start production server
npm start
```

## 🌐 VPS Deployment

### Using the deployment script:
```bash
chmod +x deploy.sh
./deploy.sh
```

### Manual deployment:
```bash
# Install dependencies
npm install --production

### Manual Setup

#### Prerequisites
- Node.js 18.x LTS
- MongoDB Atlas account
- VPS with Ubuntu/Debian

#### Installation Steps

1. **Install dependencies:**
```bash
npm install --production
```

2. **Configure environment:**
Copy `.env.example` to `.env` and configure:
```env
MONGODB_CONNECTION_STRING=mongodb+srv://username:password@cluster.mongodb.net/dbname
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
PORT=3000
```

3. **Start with PM2:**
```bash
npm install -g pm2
pm2 start ecosystem.config.json --env production
pm2 save
pm2 startup
```

## 🏗️ Architecture

- **Backend:** Node.js with Express 5.1.0
- **Database:** MongoDB Atlas
- **Frontend:** EJS templates with Tailwind CSS
- **Process Manager:** PM2 for production
- **Security:** Helmet, JWT authentication

## 📁 Project Structure

```
├── app.js                 # Main application entry point
├── controllers/           # Route controllers
├── models/               # MongoDB models
├── routes/               # Route definitions
├── views/                # EJS templates
├── public/               # Static assets (CSS, images)
├── utils/                # Utility functions
├── ecosystem.config.json # PM2 configuration
└── production-deploy.sh  # Deployment script
```

## 🔧 Configuration

### Environment Variables
- `MONGODB_CONNECTION_STRING`: MongoDB Atlas connection string
- `ADMIN_EMAIL`: Admin login email
- `ADMIN_PASSWORD`: Admin login password
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Set to 'production'
- `PORT`: Application port (default: 3000)

### Static Assets
- CSS: `/public/output.css` (compiled Tailwind CSS)
- Images: `/public/*.png` (logos and livestock images)
- Uploads: `/public/uploads/` (user uploaded content)

## 🛡️ Security Features

- Helmet middleware for security headers
- JWT-based authentication
- Input validation and sanitization
- Secure file upload handling
- Environment variable protection

## 📊 Admin Features

- Dashboard with statistics
- Product management (CRUD operations)
- Inquiry management
- File upload for product images

## 🌐 Pages

- **Home:** Main landing page with hero section
- **About Us:** Company information and story
- **Products:** Livestock showcase (goats, hens, pigs)
- **Gallery:** Image gallery with filtering
- **Contact:** Contact form with inquiry system
- **Subsidy:** Government subsidy information

## � Monitoring

Monitor your application:
```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs

# Restart application
pm2 restart krushiyuga

# Monitor resources
pm2 monit
```

## 🔄 Updates

To update the application:
```bash
git pull origin main
npm install --production
pm2 restart krushiyuga
```

## 📞 Support

For technical support or questions about the deployment, please contact the development team.

## 📄 License

This project is proprietary software developed for Krushiyuga.

---

**� Krushiyuga - Quality Livestock for Sustainable Agriculture**
