#!/bin/bash

# Quick VPS Deployment Commands for Krushiyuga Website
# Copy and paste these commands on your VPS terminal

echo "🚀 Starting Krushiyuga VPS Deployment..."

# Step 1: Clone the repository
echo "📥 Cloning repository..."
git clone https://github.com/abhishekv1808/krushiyuga.git
cd krushiyuga

# Step 2: Create .env file
echo "📝 Creating .env file..."
cat > .env << 'EOF'
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
EOF

# Step 3: Run deployment script
echo "🔧 Running deployment script..."
chmod +x deploy.sh
./deploy.sh

echo ""
echo "✅ Deployment completed!"
echo ""
echo "🚀 To start the application:"
echo "npm start                    # Test run"
echo "npm install -g pm2           # Install PM2"
echo "pm2 start ecosystem.config.json  # Production start"
echo "pm2 save && pm2 startup      # Auto-start on boot"
echo ""
echo "🌐 Your website will be available at: http://your-domain:3000"
