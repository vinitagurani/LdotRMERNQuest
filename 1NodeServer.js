const http = require('http');

// Create the server
const server = http.createServer((req, res) => {
    // Set the response header
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    // Check the URL path
    if (req.url === '/') {
        res.write('Hello, World!');
    } else {
        res.write('404 Not Found');
    }

    // End the response
    res.end();
});

// Listen on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
