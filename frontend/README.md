```md
# 🔐 Full Stack Authentication System

A secure authentication system built using **React, Node.js, Express, and MongoDB** featuring OTP email verification, JWT authentication, password reset, and protected routes.

This project demonstrates a production-style authentication flow used in modern web applications.

---

## 🚀 Features

### ✅ User Authentication
- User Signup with Email OTP verification
- Login with JWT token authentication
- Protected dashboard route
- Logout functionality

### ✅ Email Verification
- OTP sent via email
- OTP verification required before account activation
- OTP resend functionality
- OTP expiration handling

### ✅ Password Security
- Password hashing using bcrypt
- Secure login using hashed password comparison
- Reset password via OTP

### ✅ Password Reset Flow
1. User requests password reset
2. OTP sent to email
3. User verifies OTP
4. New password is securely updated

### ✅ Security Features
- JWT token authentication
- Password hashing with bcrypt
- Protected routes
- Token-based session handling
- OTP expiration validation

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router
- Tailwind CSS
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcrypt
- Email service (SMTP / API)

### Deployment
- Backend deployed on Render
- Frontend deployed on Vercel

---

## 📂 Project Structure

```

auth/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── index.js
│
└── frontend/
├── src/
│   ├── pages/
│   └── components/
└── App.jsx

```

---

## 🔄 Authentication Flow

### Signup Flow
```

User enters details
↓
OTP sent to email
↓
User verifies OTP
↓
Account activated

```

### Login Flow
```

User logs in
↓
JWT token generated
↓
Token stored in browser
↓
Access protected routes

```

### Password Reset Flow
```

User requests reset
↓
OTP sent
↓
OTP verified
↓
Password updated

```

---

## 🔑 Environment Variables (Backend)

Create `.env` file inside backend folder:

```

PORT=8080
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password

````

---

## ▶ Running Locally

### Backend
```bash
cd backend
npm install
npm run dev
````

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📌 Future Improvements

* Refresh tokens
* Google OAuth login
* Rate limiting
* Account lock after multiple failed attempts
* Profile management
* Role-based access

---

## 👨‍💻 Author

**Satyam** — Full Stack Developer

```

---

If you want next, we can make a **resume-ready project description** or a **portfolio project card** for this project.
```
