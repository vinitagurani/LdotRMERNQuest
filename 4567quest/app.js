
const express = require('express');
const mongoose = require('mongoose');
const User = require('./userModel'); // Import the User model

const app = express();

const cors = require('cors');

app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/usersdb')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// Middleware to parse JSON
app.use(express.json());

app.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // Assuming User is your model
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});


// Route to fetch user by email
app.get('/users/:email', async (req, res) => {
    const email = req.params.email;

    try {
        // Find the user by email
        const user = await User.findOne({ email: email });
        
        // If user not found, return 404
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user data
        res.json(user);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'Server error', error });
    }
});


app.post('/users', async (req, res) => {
    const { name, email, age } = req.body;

    const newUser = new User({ name, email, age });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); // Return the created user
        console.log('User created:', savedUser); // Log the created user
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
});

// Start the Express server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
