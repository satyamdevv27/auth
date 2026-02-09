---
```markdown
# 🔐 MERN Auth System with Email OTP

A secure authentication system built using the MERN stack.  
It supports signup with OTP verification, login using JWT, password reset via OTP, and protected routes.

This project is designed as a **production-ready authentication system** for web applications.

---

## 🚀 Live Demo

Frontend (Vercel):  
👉 https://auth-app-devv27.vercel.app

Backend API (Render):  
👉 https://auth-backend-xzsl.onrender.com

---

## ✨ Features

### ✅ User Authentication
- User Signup
- Email OTP Verification
- Login with JWT
- Protected Routes
- Logout functionality

### ✅ Password Security
- Password hashing using bcrypt
- Reset password via OTP

### ✅ OTP System
- Email OTP verification
- OTP expiry handling
- Resend OTP support
- Secure pending user flow

### ✅ Security
- JWT authentication
- Password hashing
- Email verification before login
- CORS enabled for frontend

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router
- Tailwind CSS
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt
- Nodemailer
- Resend (email service)

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 📁 Project Structure

```

auth/
│
├── backend/
│   ├── controllers/
│   │   └── authcontroller.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── authvalidation.js
│   ├── models/
│   │   ├── db.js
│   │   ├── user.js
│   │   └── pendingUser.js
│   ├── routes/
│   │   └── authroutes.js
│   ├── services/
│   │   └── mailService.js
│   ├── utils/
│   │   └── otp.js
│   └── index.js
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── pages/
│       │   ├── dashboard.jsx
│       │   ├── ForgotPassword.jsx
│       │   ├── home.jsx
│       │   ├── login.jsx
│       │   └── signup.jsx
│       ├── App.css
│       └── App.jsx
│
└── README.md

```

---

## 🔄 Authentication Flow

### Signup Flow
1. User enters details.
2. OTP is sent to email.
3. User verifies OTP.
4. Account is created.

### Login Flow
1. User logs in with email & password.
2. JWT token generated.
3. Token stored in browser.
4. Protected routes accessible.

### Reset Password Flow
1. User requests password reset.
2. OTP sent to email.
3. OTP verified.
4. New password saved.

---

## ⚙️ Environment Variables

Backend `.env` example:

```

PORT=8080
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

EMAIL_USER=your_email
EMAIL_PASS=your_app_password

```

---

## 🧪 Future Improvements
- Refresh token system
- Rate limiting
- OAuth login (Google/GitHub)
- User profile page
- Role-based authorization

---

## 👨‍💻 Author

Satyam  
GitHub: https://github.com/satyamdevv27

---

## 📄 License
This project is open-source and available under the MIT License.
```

---

### ✅ After pasting

Commit from root:

```bash
git add README.md
git commit -m "update README"
git push
```

---

