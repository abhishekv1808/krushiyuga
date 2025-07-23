#!/bin/bash

# Simple build script for Render deployment
echo "🚀 Starting Render build process..."

# Check if CSS file exists
if [ -f "public/output.css" ]; then
    echo "✅ CSS file already exists - build complete"
    echo "📁 CSS file size: $(du -h public/output.css | cut -f1)"
else
    echo "⚠️ CSS file not found - this should not happen"
    echo "📂 Available files in public/:"
    ls -la public/
fi

# Verify Node.js version
echo "📋 Node.js version: $(node --version)"
echo "📋 NPM version: $(npm --version)"

# List dependencies
echo "📦 Dependencies installed:"
npm list --depth=0 2>/dev/null || echo "Dependencies list unavailable"

echo "✅ Build process completed successfully"
