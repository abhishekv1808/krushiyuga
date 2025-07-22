#!/bin/bash

# Krushiyuga Website Production Deployment Script for VPS
# Author: Abhishek V
# Version: 1.0

echo "🚀 Starting Krushiyuga Website Production Deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js $(node --version) and npm $(npm --version) detected"

# Clean install dependencies
echo "🧹 Cleaning previous installation..."
rm -rf node_modules
rm -f package-lock.json

echo "📦 Installing production dependencies..."
npm cache clean --force
npm install --only=production

# Verify critical packages
echo "🔍 Verifying critical packages..."
npm list --depth=0 | grep -E "(helmet|compression|express|mongoose)"

# Install dev dependencies for build
echo "🔧 Installing build dependencies..."
npm install --only=dev

# Build CSS
echo "🎨 Building optimized CSS..."
npm run build

# Remove dev dependencies
echo "🗑️ Removing dev dependencies..."
npm prune --production

# Create necessary directories
echo "📁 Creating required directories..."
mkdir -p public/uploads/products
mkdir -p logs

# Set proper permissions
echo "🔐 Setting proper permissions..."
chmod 755 public/uploads/products
chmod 755 logs

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found!"
    echo "📋 Please copy .env.example to .env and configure it with your production values"
    cp .env.example .env
fi

echo "✅ Deployment completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Configure your .env file with production values"
echo "2. Test the server: npm start"
echo "3. For production: npm install -g pm2 && pm2 start ecosystem.config.json"
echo ""
echo "🌐 Health check will be available at: http://your-domain/health"
