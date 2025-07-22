# Krushiyuga Website - Production Deployment Guide

## 🚀 Quick Deployment to Hostinger VPS

### Prerequisites
- Node.js 18+ installed on your VPS
- MongoDB Atlas account (or local MongoDB)
- Gmail account with App Password for email functionality

### 1. Upload Files to VPS
Upload all project files to your VPS using FTP/SFTP or Git.

### 2. Configure Environment Variables
Create a `.env` file in the root directory with the following variables:

```bash
# Database Configuration
MONGODB_USERNAME=your_mongodb_username
MONGODB_PASSWORD=your_mongodb_password
MONGODB_CLUSTER=your_cluster_url.mongodb.net
MONGODB_DATABASE=krushiyuga

# Admin Configuration
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your_secure_admin_password
ADMIN_FIRSTNAME=Admin
ADMIN_LASTNAME=User

# Email Configuration (Gmail App Password)
GMAIL_APP_PASSWORD=your-16-digit-app-password

# Server Configuration
PORT=3000
NODE_ENV=production

# Security
JWT_SECRET=your_very_long_and_secure_jwt_secret_key_here
```

### 3. Install Dependencies and Deploy
```bash
# Make deployment script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

### 4. Start with PM2 (Recommended for Production)
```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start ecosystem.config.json

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### 5. Alternative: Start with npm
```bash
npm start
```

## 🔧 Production Features Enabled

- ✅ Security headers with Helmet
- ✅ Gzip compression
- ✅ Environment-based logging
- ✅ Error handling without console logs in production
- ✅ Secure MongoDB connection
- ✅ No hardcoded credentials
- ✅ Optimized for performance

## 🌐 Nginx Configuration (Optional)

If you're using Nginx as a reverse proxy:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📊 Monitoring

Check application status:
```bash
pm2 status
pm2 logs krushiyuga-website
pm2 monit
```

## 🛠️ Maintenance

### Update Application
```bash
# Pull latest changes
git pull origin main

# Install new dependencies
npm install --production

# Rebuild CSS
npm run build

# Restart application
pm2 restart krushiyuga-website
```

### Backup Database
Make sure to regularly backup your MongoDB database.

## 🔍 Troubleshooting

1. **Port already in use**: Change the PORT in .env file
2. **Database connection issues**: Verify MongoDB credentials and whitelist VPS IP
3. **Email not working**: Ensure Gmail App Password is correctly configured
4. **Permission errors**: Check file permissions for uploads directory

## 📞 Support

For issues, contact the development team or check the application logs.
