# 🐄 Krushiyuga - Modern Livestock & Agricultural Solutions

A modern, responsive website for livestock farming and agricultural services built with Node.js, Express, and Tailwind CSS.

## ✨ Features

- **Modern Design**: Clean, responsive UI with Tailwind CSS
- **Livestock Management**: Browse different livestock categories (Goats, Hens, Pigs)
- **Product Gallery**: Visual showcase of livestock and products
- **Contact System**: Contact form with email notifications
- **Admin Panel**: Secure admin interface for content management
- **Responsive**: Mobile-first design that works on all devices

## 🛠️ Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Frontend**: EJS templating engine
- **Styling**: Tailwind CSS
- **Security**: Helmet.js for security headers
- **File Upload**: Multer for image handling
- **Email**: Nodemailer for contact form submissions

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB database
- Gmail account for email notifications (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhishekv1808/krushiyuga.git
   cd krushiyuga
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database Configuration
   MONGODB_USERNAME=your_mongodb_username
   MONGODB_PASSWORD=your_mongodb_password
   MONGODB_CLUSTER=your_cluster_url
   MONGODB_DATABASE=krushiyuga
   
   # Admin Configuration
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=your_secure_password
   ADMIN_FIRSTNAME=Admin
   ADMIN_LASTNAME=User
   
   # Email Configuration (Optional)
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   GMAIL_APP_PASSWORD=your_gmail_app_password
   
   # Security
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Build CSS**
   ```bash
   npm run build
   ```

5. **Start the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Access the application**
   - Website: `http://localhost:3000`
   - Admin Panel: `http://localhost:3000/admin/login`
   - Health Check: `http://localhost:3000/health`

## 📁 Project Structure

```
krushiyuga/
├── controllers/          # Route controllers
│   ├── adminController.js
│   ├── productController.js
│   └── userController.js
├── models/              # Database models
│   ├── adminModel.js
│   ├── contactModel.js
│   └── productModel.js
├── routes/              # Express routes
│   ├── adminRouter.js
│   └── userRouter.js
├── utils/               # Utility functions
│   ├── db.js
│   ├── emailUtils.js
│   ├── mainUtils.js
│   └── uploadUtils.js
├── views/               # EJS templates
│   ├── admin/           # Admin panel views
│   ├── partials/        # Reusable components
│   ├── user/            # Public website views
│   ├── input.css        # Tailwind input file
│   └── gallery.css      # Gallery styles
├── public/              # Static assets
│   ├── images/          # Website images
│   ├── uploads/         # User uploaded files
│   └── output.css       # Compiled CSS
└── app.js               # Main application file
```

## 🎨 Development

### CSS Development

The project uses Tailwind CSS for styling:

- **Input file**: `views/input.css`
- **Output file**: `public/output.css`
- **Build command**: `npm run build`

### Adding New Features

1. Create appropriate routes in `routes/`
2. Add controllers in `controllers/`
3. Create database models in `models/`
4. Add views in `views/`
5. Update styling as needed

## 🔒 Security

- Helmet.js for security headers
- CORS protection
- Input validation and sanitization
- Secure session management
- Environment variable protection

## 🌐 Deployment

The application is ready for deployment on various platforms:

- **Local**: Use `npm start`
- **Cloud Platforms**: Compatible with Heroku, Railway, Render, etc.
- **VPS**: Traditional server deployment ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Abhishek V**
- Email: abhishek.v1808@gmail.com
- GitHub: [@abhishekv1808](https://github.com/abhishekv1808)

## 🙏 Acknowledgments

- Tailwind CSS for the amazing utility-first framework
- Express.js community for the robust backend framework
- MongoDB team for the flexible database solution

---

*Built with ❤️ for modern agriculture and livestock management*
