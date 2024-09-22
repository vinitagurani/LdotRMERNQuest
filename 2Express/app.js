const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());


// Sample list of users
const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' }
];

app.get('/', (req, res) => {
    res.send('Welcome to the User API, you can go to http://localhost:3000/users to see the list of users.');
});

// Define /users route that returns JSON list of users
app.get('/users', (req, res) => {
    res.json(users);
});

// Set the server to listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
