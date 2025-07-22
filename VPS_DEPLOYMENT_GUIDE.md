# 🚀 Krushiyuga VPS Deployment Guide

## ✅ **Issue Fixed: MongoDB Connection Error**

The `ENOTFOUND _mongodb._tcp.your_cluster_url` error has been resolved by correcting the MongoDB configuration in the `.env` file.

## 📋 **VPS Deployment Steps**

### 1. **Clone Repository on VPS**
```bash
git clone https://github.com/abhishekv1808/krushiyuga.git
cd krushiyuga
```

### 2. **Create Environment File**
Create a `.env` file with the following content:

```env
# Production Environment Variables
MONGODB_USERNAME=abhishekv1808
MONGODB_PASSWORD=Grow@$@2025
MONGODB_CLUSTER=aribnb.xvmlcnz.mongodb.net
MONGODB_DATABASE=krushiyuga

# Admin Configuration
ADMIN_EMAIL=abhishek.v1808@gmail.com
ADMIN_PASSWORD=Grow@$@2025
ADMIN_FIRSTNAME=Abhishek
ADMIN_LASTNAME=V

# Email Configuration
EMAIL_USER=vermaabhishek1808@gmail.com
EMAIL_PASS=kpsuiicersxufljz
GMAIL_APP_PASSWORD=kpsuiicersxufljz

# JWT Secret
JWT_SECRET=kru$hiy0ga_s3cur3_t0k3n_2024!@#

# Server Configuration
PORT=3000
NODE_ENV=production
```

### 3. **Run Deployment Script**
```bash
chmod +x deploy.sh
./deploy.sh
```

### 4. **Manual Deployment (Alternative)**
```bash
# Install dependencies
npm install --production

# Build CSS
npm run build

# Test the application
npm start
```

### 5. **Production Deployment with PM2**
```bash
# Install PM2 globally
npm install -g pm2

# Start application with PM2
pm2 start ecosystem.config.json

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

## 🔧 **Key Configuration Points**

1. **MongoDB Variables**: The application uses individual MongoDB variables:
   - `MONGODB_USERNAME`: Your MongoDB Atlas username
   - `MONGODB_PASSWORD`: Your MongoDB Atlas password  
   - `MONGODB_CLUSTER`: Just the cluster URL (without mongodb+srv://)
   - `MONGODB_DATABASE`: Database name

2. **Email Configuration**: Uses Gmail with app password for sending emails

3. **Security**: JWT secret for authentication tokens

## 🌐 **Testing the Deployment**

After deployment, test these endpoints:
- **Health Check**: `http://your-domain:3000/health`
- **Homepage**: `http://your-domain:3000/`
- **Admin Login**: `http://your-domain:3000/admin/login`

## 📱 **Expected Output**
When successful, you should see:
```
Connected to MongoDB
Server is running on port 3000
```

## 🔴 **Common Issues & Solutions**

### MongoDB Connection Error
- **Issue**: `ENOTFOUND _mongodb._tcp.your_cluster_url`
- **Solution**: Ensure `MONGODB_CLUSTER` contains only the cluster URL without protocol

### Port Issues
- **Issue**: Port 3000 already in use
- **Solution**: Change `PORT` in `.env` or kill existing processes

### Permission Issues
- **Issue**: Cannot write to uploads directory
- **Solution**: `chmod 755 public/uploads/products`

## 📞 **Support**
If you encounter any issues during deployment, check the logs:
```bash
# PM2 logs
pm2 logs

# Application logs
tail -f logs/app.log
```

---
**🐐 Krushiyuga - Production Ready Deployment** ✅
