// Import the Express framework
import express from 'express';

// Create an Express application instance
const app = express();

// Define the server port number
const PORT = 3000;

// Define a route for the root URL ("/")
app.get('/', (req, res) => {
  // Send a simple text response to the client
  res.send("Backend server is live!");
});

// Start the server and listen on the defined port
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
