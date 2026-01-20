# User Management Application

A full-stack web application demonstrating user registration, authentication, and data persistence.

![Project Screenshot](screenshot.png)

## 🚀 Features

- User registration with duplicate email prevention
- Login authentication with credential verification
- Display all registered users
- Real-time success/error feedback
- Responsive design

## 🛠️ Technologies Used

**Frontend:**
- HTML5
- CSS3
- Vanilla JavaScript

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose ODM

## 📁 Project Structure
```
user-management-app/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server.js
├── package.json
└── README.md
```

## ⚙️ Installation & Setup

1. **Clone the repository:**
```bash
   git clone https://github.com/YOUR-USERNAME/user-management-app.git
   cd user-management-app
```

2. **Install dependencies:**
```bash
   npm install
```

3. **Make sure MongoDB is running:**
```bash
   # Windows
   net start MongoDB
   
   # Mac
   brew services start mongodb-community
```

4. **Start the server:**
```bash
   node server.js
```

5. **Open the application:**
   - Open `frontend/index.html` with Live Server
   - Or open it directly in your browser

## 🎯 How to Use

1. **Register:** Fill in your name, email, and password, then click "Register"
2. **Login:** Enter your credentials and click "Login"
3. **View Users:** Click "Show All Users" to see registered users

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register a new user |
| POST | `/login` | Authenticate user |
| GET | `/users` | Get all registered users |

## 🔐 Security Note

⚠️ **This is a learning project.** Passwords are stored in plain text for educational purposes. 

**For production, implement:**
- Password hashing (bcrypt)
- JWT authentication
- Input validation & sanitization
- Environment variables for sensitive data

## 📚 What I Learned

- Full-stack application architecture
- RESTful API design
- Asynchronous JavaScript (Promises, async/await)
- Database schema design and CRUD operations
- Client-server communication
- Error handling and validation

## 🚀 Future Improvements

- [ ] Password encryption with bcrypt
- [ ] JWT-based authentication
- [ ] Email verification
- [ ] Password reset functionality
- [ ] User profile editing
- [ ] Input validation improvements
- [ ] Deployment to cloud platform

## 📄 License

This project is open source and available under the [MIT License](LICENSE).