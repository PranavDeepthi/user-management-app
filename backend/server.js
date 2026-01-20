// Import required packages
const express = require('express');        // Web framework
const mongoose = require('mongoose');      // Database tool
const cors = require('cors');              // Cross-origin requests

// Create Express application
const app = express();

// MIDDLEWARE - Tools that process requests
app.use(cors());                           // Allow frontend to connect
app.use(express.json());                   // Understand JSON data

// DATABASE CONNECTION
// Connect to MongoDB (database)
mongoose.connect('mongodb://localhost:27017/userManagementDB', {
    useNewUrlParser: true,                 // Use new connection method
    useUnifiedTopology: true               // Use new server discovery
})
.then(function() {
    console.log('Connected to MongoDB successfully!');
})
.catch(function(error) {
    console.log('MongoDB connection error:', error);
});

// USER SCHEMA - Define how user data should look
const userSchema = new mongoose.Schema({
    name: {
        type: String,                      // Must be text
        required: true                     // Must be provided
    },
    email: {
        type: String,
        required: true,
        unique: true                       // No duplicate emails
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now                  // Automatically set current date
    }
});

// Create User model from schema
const User = mongoose.model('User', userSchema);

// ROUTES - What happens at different URLs

// ROOT ROUTE - Just to check if server is running
app.get('/', function(request, response) {
    response.send('User Management API is running!');
});

// REGISTER ROUTE - Create new user
app.post('/register', async function(request, response) {
    try {
        // Get data from request
        const { name, email, password } = request.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email: email });
        
        if (existingUser) {
            // User already registered
            return response.json({
                success: false,
                message: 'User with this email already exists!'
            });
        }
        
        // Create new user
        const newUser = new User({
            name: name,
            email: email,
            password: password              // In real apps, encrypt this!
        });
        
        // Save to database
        await newUser.save();
        
        // Send success response
        response.json({
            success: true,
            message: 'User registered successfully!'
        });
        
    } catch (error) {
        // Send error response
        response.json({
            success: false,
            message: 'Registration failed!',
            error: error.message
        });
    }
});

// LOGIN ROUTE - Check user credentials
app.post('/login', async function(request, response) {
    try {
        // Get data from request
        const { email, password } = request.body;
        
        // Find user by email
        const user = await User.findOne({ email: email });
        
        // Check if user exists
        if (!user) {
            return response.json({
                success: false,
                message: 'User not found!'
            });
        }
        
        // Check if password matches
        if (user.password !== password) {
            return response.json({
                success: false,
                message: 'Incorrect password!'
            });
        }
        
        // Login successful
        response.json({
            success: true,
            message: 'Login successful!',
            user: {
                name: user.name,
                email: user.email
            }
        });
        
    } catch (error) {
        response.json({
            success: false,
            message: 'Login failed!',
            error: error.message
        });
    }
});

// GET USERS ROUTE - Retrieve all users
app.get('/users', async function(request, response) {
    try {
        // Get all users from database (without passwords)
        const users = await User.find({}, 'name email createdAt');
        
        // Send users back
        response.json({
            success: true,
            users: users
        });
        
    } catch (error) {
        response.json({
            success: false,
            message: 'Could not fetch users!',
            error: error.message
        });
    }
});

// START SERVER - Listen for requests
const PORT = 3000;
app.listen(PORT, function() {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//**What this code does:**

//1. **Sets up Express server** - Creates the backend application
//2. **Connects to MongoDB** - Links to the database
//3. **Defines User schema** - Sets rules for user data
//4. **Creates routes** - Defines what happens at each URL:
//   - /register - Adds new user
//   - /login - Checks credentials
//  - /users - Returns all users

// Understanding Routes (API Endpoints)
// 
// Routes are like different doors in a building. Each door leads to a different room (function):
// Your Backend Building:
// ├── Front Door (/)           → "Welcome! Server is running"
// ├── Registration Office      → /register (Create new user)
// ├── Login Counter           → /login (Verify credentials)
// └── User Directory          → /users (Show all users)