# 🚀 Production Deployment Checklist

## ✅ Pre-Deployment Checklist

### 📋 **Files and Configuration**
- [x] All sensitive data moved to environment variables
- [x] .env.example created with all required variables
- [x] .gitignore updated to exclude sensitive files
- [x] Package.json optimized (dev dependencies separated)
- [x] Dependencies cleaned and optimized
- [x] CSS built and minified
- [x] Upload directories created with proper structure
- [x] PM2 ecosystem configuration ready
- [x] Deployment scripts created and tested

### 🔒 **Security**
- [x] No hardcoded passwords or secrets
- [x] Helmet security headers implemented (with fallback)
- [x] JWT secret configured
- [x] Environment-based error handling
- [x] Input validation and sanitization
- [x] Proper file upload restrictions

### 🛠️ **Performance**
- [x] Gzip compression enabled
- [x] Static file serving optimized
- [x] Database queries optimized
- [x] Memory management configured
- [x] CSS/JS minified

### 📁 **Project Structure**
- [x] Clean file structure
- [x] No unnecessary/backup files
- [x] Proper separation of concerns
- [x] Modular architecture
- [x] Organized views and components

## 🚀 **Deployment Steps for VPS**

### 1. **Upload to VPS**
```bash
# Clone from GitHub
git clone https://github.com/abhishekv1808/krushiyuga-website.git
cd krushiyuga-website
```

### 2. **Configure Environment**
```bash
# Copy and configure environment variables
cp .env.example .env
nano .env  # Configure with your production values
```

### 3. **Deploy**
```bash
# Make scripts executable
chmod +x deploy.sh
chmod +x start-production.sh
chmod +x install-packages.sh

# Run deployment
./deploy.sh
```

### 4. **Start Application**
```bash
# Option 1: With PM2 (Recommended)
npm install -g pm2
./start-production.sh

# Option 2: Direct start
npm start
```

### 5. **Verify Deployment**
- Health check: `http://your-domain/health`
- Homepage: `http://your-domain`
- Admin panel: `http://your-domain/admin/login`

## 📊 **Monitoring**

### **With PM2**
```bash
pm2 status          # Check application status
pm2 logs            # View logs
pm2 monit           # Real-time monitoring
pm2 restart all     # Restart application
```

### **Manual Monitoring**
- Check logs in `./logs/` directory
- Monitor memory usage
- Check disk space for uploads
- Monitor database connections

## 🔧 **Maintenance**

### **Updates**
```bash
git pull origin main
npm install --production
npm run build
pm2 restart krushiyuga-website
```

### **Backup**
- Database: Regular MongoDB backups
- Uploads: Backup `public/uploads/` directory
- Environment: Secure backup of `.env` file

## 🆘 **Troubleshooting**

### **Common Issues**
1. **Module not found**: Run `./install-packages.sh`
2. **Port in use**: Change PORT in .env or kill process
3. **Database connection**: Check MongoDB credentials and IP whitelist
4. **Email issues**: Verify Gmail App Password
5. **Permission errors**: `chmod 755 public/uploads/products`

### **Logs**
- Application logs: `./logs/combined.log`
- Error logs: `./logs/err.log`
- Output logs: `./logs/out.log`
- PM2 logs: `pm2 logs`

## ✨ **Production Features Enabled**

- ✅ **Security**: Helmet headers, HTTPS ready, JWT authentication
- ✅ **Performance**: Compression, optimized assets, efficient queries
- ✅ **Monitoring**: Health checks, comprehensive logging, PM2 monitoring
- ✅ **Scalability**: PM2 cluster mode, memory management
- ✅ **Maintenance**: Easy updates, automated deployment, backup ready

## 🎉 **Your Krushiyuga Website is Production Ready!**

The application is now optimized for:
- **Hostinger VPS** deployment
- **High performance** and reliability
- **Security** best practices
- **Easy maintenance** and updates
- **Professional** production environment
