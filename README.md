# Krushiyuga - Modern Animal Husbandry Website

A comprehensive livestock farming platform specializing in Osmanabadi goat breeding and farming solutions.

## 🎯 Features

- 🌟 Modern, responsive design using Tailwind CSS
- 📱 Mobile-first design approach
- 🐐 Dynamic product catalog for livestock
- 📧 Contact form with email notifications
- 🖼️ Interactive image gallery
- 📊 Subsidy information section
- 🔐 Admin panel for content management
- 🚀 Production-ready with security features

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js 5.1.0
- **Database**: MongoDB Atlas with Mongoose 8.16.2
- **Frontend**: EJS Templates, Tailwind CSS 4.1.11
- **Security**: Helmet 8.1.0, JWT Authentication, bcryptjs
- **Email**: Nodemailer 7.0.5 with Gmail integration
- **File Upload**: Multer 2.0.1
- **Process Management**: PM2 with cluster mode

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/abhishekv1808/krushiyuga.git
cd krushiyuga
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment setup
Copy `.env.example` to `.env` and configure:
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### 4. Build and run
```bash
# Build CSS
npm run build

# Start development server
npm run dev

# Start production server
npm start
```

## 🌐 VPS Deployment

### Using the deployment script:
```bash
chmod +x deploy.sh
./deploy.sh
```

### Manual deployment:
```bash
# Install dependencies
npm install --production

# Build assets
npm run build

# Start with PM2
npm install -g pm2
pm2 start ecosystem.config.json
```

## 📁 Project Structure

```
├── app.js                  # Main application file
├── package.json           # Dependencies and scripts
├── ecosystem.config.json  # PM2 configuration
├── deploy.sh             # VPS deployment script
├── controllers/          # Route controllers
├── models/              # Database models
├── routes/              # API routes
├── views/               # EJS templates
├── public/              # Static assets
├── utils/               # Utility functions
└── logs/                # Application logs
```

## 🔐 Security Features

- Environment-based configuration
- Helmet.js security headers
- JWT-based authentication
- Password hashing with bcryptjs
- Input validation and sanitization
- Rate limiting and compression

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

**Abhishek Verma** - [@abhishekv1808](https://github.com/abhishekv1808)

**Project Link**: [https://github.com/abhishekv1808/krushiyuga](https://github.com/abhishekv1808/krushiyuga)

---

**🐐 Promoting sustainable livestock farming and Osmanabadi goat breeding excellence**
