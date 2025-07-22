#!/bin/bash

# Production Deployment Script for Krushiyuga Website
# Run this script on your VPS after cloning the repository

echo "🚀 Starting Krushiyuga Website Production Deployment..."

# Check if script is run as root
if [ "$EUID" -ne 0 ]; then
    echo "❌ Please run this script as root or with sudo"
    exit 1
fi

# Update system packages
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install Node.js 18.x LTS
echo "🟢 Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install PM2 globally
echo "⚙️ Installing PM2 Process Manager..."
npm install -g pm2

# Install production dependencies
echo "📚 Installing production dependencies..."
npm install --production

# Create production environment file
if [ ! -f .env ]; then
    echo "📝 Creating environment file..."
    cp .env.example .env
    echo "⚠️ Please configure .env file with your production values:"
    echo "   - MongoDB connection string"
    echo "   - Admin credentials"
    echo "   - Other environment variables"
    echo ""
    read -p "Press Enter to continue after configuring .env file..."
fi

# Set up directory permissions
echo "🔧 Setting up file permissions..."
chown -R www-data:www-data public/uploads/
chmod -R 755 public/uploads/
chmod 644 public/output.css
chmod 644 public/*.png public/*.jpg 2>/dev/null || true

# Start application with PM2
echo "🎯 Starting application with PM2..."
pm2 start ecosystem.config.json --env production
pm2 save
pm2 startup

# Setup Nginx (optional)
read -p "🌐 Do you want to set up Nginx reverse proxy? (y/N): " setup_nginx
if [[ $setup_nginx =~ ^[Yy]$ ]]; then
    echo "📡 Installing and configuring Nginx..."
    apt install -y nginx
    
    read -p "Enter your domain name (e.g., yourdomain.com): " domain_name
    
    cat > /etc/nginx/sites-available/krushiyuga << EOF
server {
    listen 80;
    server_name $domain_name www.$domain_name;
    
    # Serve static files directly
    location /public/ {
        alias $(pwd)/public/;
        expires 1M;
        add_header Cache-Control "public, immutable";
    }
    
    # Proxy all other requests to Node.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF
    
    ln -sf /etc/nginx/sites-available/krushiyuga /etc/nginx/sites-enabled/
    nginx -t && systemctl reload nginx
    echo "✅ Nginx configured successfully!"
fi

# Show final status
echo ""
echo "🎉 Production deployment completed!"
echo "📊 Application Status:"
pm2 status
echo ""
echo "🌐 Your website is now running at:"
echo "   - Local: http://localhost:3000"
if [[ ! -z "$domain_name" ]]; then
    echo "   - Domain: http://$domain_name"
fi
echo ""
echo "📋 Next steps:"
echo "   1. Configure your domain's DNS to point to this server"
echo "   2. Set up SSL certificate with Let's Encrypt (recommended)"
echo "   3. Configure firewall rules if needed"
echo "   4. Monitor application logs: pm2 logs"
echo ""
echo "✅ Deployment complete! Your Krushiyuga website is production-ready!"
