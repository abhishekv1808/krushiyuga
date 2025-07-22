#!/bin/bash

# VPS Package Installation Script
echo "🔧 Installing packages for VPS deployment..."

# Install specific packages that might be missing
npm install helmet@8.1.0 --save
npm install compression@1.8.0 --save
npm install express@5.1.0 --save
npm install mongoose@8.16.2 --save
npm install dotenv@17.2.0 --save
npm install ejs@3.1.10 --save
npm install cookie-parser@1.4.7 --save
npm install bcryptjs@3.0.2 --save
npm install jsonwebtoken@9.0.2 --save
npm install multer@2.0.1 --save
npm install nodemailer@7.0.5 --save

echo "✅ All packages installed successfully!"
echo "🧪 Testing package imports..."

node -e "
try {
    require('helmet');
    console.log('✅ Helmet: OK');
} catch(e) {
    console.log('❌ Helmet: FAILED');
}

try {
    require('compression');
    console.log('✅ Compression: OK');
} catch(e) {
    console.log('❌ Compression: FAILED');
}

try {
    require('express');
    console.log('✅ Express: OK');
} catch(e) {
    console.log('❌ Express: FAILED');
}
"
