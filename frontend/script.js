// Wait for the page to fully load before running code
document.addEventListener('DOMContentLoaded', function() {
    
    // Get references to form elements
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const loadUsersButton = document.getElementById('loadUsers');
    
    // REGISTRATION HANDLING
    registerForm.addEventListener('submit', function(event) {
        // Prevent form from refreshing the page
        event.preventDefault();
        
        // Get values from input fields
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        
        // Create user object
        const userData = {
            name: name,
            email: email,
            password: password
        };
        
        // Send data to backend
        fetch('http://localhost:3000/register', {
            method: 'POST',                          // Type of request
            headers: {
                'Content-Type': 'application/json'   // Telling server we send JSON
            },
            body: JSON.stringify(userData)           // Convert object to JSON string
        })
        .then(function(response) {
            // Convert response to JSON
            return response.json();
        })
        .then(function(data) {
            // Show success message
            showMessage('registerMessage', data.message, 'success');
            
            // Clear the form
            registerForm.reset();
        })
        .catch(function(error) {
            // Show error if something went wrong
            showMessage('registerMessage', 'Registration failed!', 'error');
            console.log('Error:', error);
        });
    });
    
    // LOGIN HANDLING
    loginForm.addEventListener('submit', function(event) {
        // Prevent form from refreshing the page
        event.preventDefault();
        
        // Get values from input fields
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Create login object
        const loginData = {
            email: email,
            password: password
        };
        
        // Send data to backend
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.success) {
                // Login successful
                showMessage('loginMessage', data.message, 'success');
                loginForm.reset();
            } else {
                // Login failed
                showMessage('loginMessage', data.message, 'error');
            }
        })
        .catch(function(error) {
            showMessage('loginMessage', 'Login failed!', 'error');
            console.log('Error:', error);
        });
    });
    
    // LOAD USERS HANDLING
    loadUsersButton.addEventListener('click', function() {
        // Request users from backend
        fetch('http://localhost:3000/users')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Display users on the page
            displayUsers(data.users);
        })
        .catch(function(error) {
            console.log('Error loading users:', error);
        });
    });
    
    // HELPER FUNCTION: Show messages
    function showMessage(elementId, message, type) {
        const messageElement = document.getElementById(elementId);
        messageElement.textContent = message;
        messageElement.className = type;
        
        // Clear message after 5 seconds
        setTimeout(function() {
            messageElement.textContent = '';
            messageElement.className = '';
        }, 5000);
    }
    
    // HELPER FUNCTION: Display users
    function displayUsers(users) {
        const usersList = document.getElementById('usersList');
        
        // Clear previous list
        usersList.innerHTML = '';
        
        // Check if there are users
        if (users.length === 0) {
            usersList.innerHTML = '<p>No users registered yet.</p>';
            return;
        }
        
        // Create HTML for each user
        users.forEach(function(user) {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            userCard.innerHTML = `
                <strong>Name:</strong> ${user.name}<br>
                <strong>Email:</strong> ${user.email}
            `;
            usersList.appendChild(userCard);
        });
    }
    
});