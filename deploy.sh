#!/bin/bash

# Pull latest changes
git pull origin main

# Install dependencies
npm install --production

# Build assets if needed
npm run build

# Restart the application
pm2 restart krushiyuga

# Reload Nginx
sudo systemctl reload nginx
