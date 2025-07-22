#!/bin/bash

# Krushiyuga Website Production Deployment Script for Hostinger VPS
# 
# Instructions:
# 1. Upload this project to your Hostinger VPS
# 2. Make sure Node.js is installed
# 3. Configure your .env file with production values
# 4. Run this script: chmod +x deploy.sh && ./deploy.sh

echo "🚀 Starting Krushiyuga Website Production Deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Build CSS
echo "🎨 Building CSS..."
npm run build

# Create uploads directory if it doesn't exist
echo "📁 Creating uploads directory..."
mkdir -p public/uploads/products

# Set proper permissions
echo "🔐 Setting permissions..."
chmod 755 public/uploads/products

echo "✅ Deployment completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Configure your .env file with production values"
echo "2. Start the server with: npm start"
echo "3. Set up PM2 for process management: npm install -g pm2 && pm2 start app.js --name krushiyuga"
echo ""
echo "🌐 Your website will be available on the configured port (default: 3000)"
