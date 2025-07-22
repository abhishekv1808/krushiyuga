#!/bin/bash

# Production Startup Script for Krushiyuga Website
# This script ensures the application starts correctly in production

echo "🚀 Starting Krushiyuga Website in Production Mode..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please copy .env.example to .env and configure it"
    exit 1
fi

# Check if required environment variables are set
if ! grep -q "MONGODB_USERNAME=" .env || ! grep -q "MONGODB_PASSWORD=" .env; then
    echo "❌ Error: Database credentials not configured in .env"
    exit 1
fi

# Check if PM2 is installed
if command -v pm2 &> /dev/null; then
    echo "🔄 Starting with PM2..."
    pm2 stop krushiyuga-website 2>/dev/null || true
    pm2 delete krushiyuga-website 2>/dev/null || true
    pm2 start ecosystem.config.json
    pm2 save
    echo "✅ Application started with PM2"
    echo "📊 Monitor with: pm2 monit"
else
    echo "⚠️  PM2 not found, starting with npm..."
    echo "📦 Install PM2 for production: npm install -g pm2"
    npm start
fi
