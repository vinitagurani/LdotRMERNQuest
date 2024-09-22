
const mongoose = require('mongoose');
const User = require('./userModel'); // Import the user model

// Connect to MongoDB (without deprecated options)
mongoose.connect('mongodb://localhost:27017/usersdb')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// Function to insert a new user
const insertUser = async () => {
    const newUser = new User({
        name: 'John Doe',
        email: 'johndoe@example.com',
        age: 30,
    });

    try {
        const savedUser = await newUser.save();
        console.log('User inserted:', savedUser);
    } catch (error) {
        console.error('Error inserting user:', error);
    } finally {
        mongoose.connection.close(); // Close the connection after insertion
    }
};

// Insert the user
insertUser();
