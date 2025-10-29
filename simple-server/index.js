// Import the Express framework
import express from 'express';

// Create an Express application instance
const app = express();
app.use(express.json()); 					// enable JSON body parsing
app.use(express.urlencoded({ extended: true }));	// enable form body parsing

// // Define the server port number
// const PORT = 3000;

// Define a route for the root URL ("/")
app.get('/', (req, res) => {
  // Send a simple text response to the client
  res.send("Backend server is live!");
});

app.get('/status', (req, res) => {
  // Send a simple text response to the client
  res.send("This is the status page");
});

app.get('/about', (req, res) => {
  res.send("This is the about page");
});

app.post("/register", (req, res) => {
  res.send("Form for user registration submitted successfully");
});

app.get('/user/:id', (req,res)=>{
 const userId = req.params.id; // access the parameter value
 res.send(`User ID is: ${userId}`);
});

app.get('/search', (req, res) => {
  const course = req.query.course;
  const id = req.query.id;
  res.send(`Search for ${id}: ${course}`);
});

app.post('/register', (req, res) => {
  console.log(req.body); // parsed data
  res.send(`Hello, ${req.body.name}!`);
});

app.post('/login', (req, res) => {
  console.log(req.body); // parsed data
  res.send(`Hello, ${req.body.name}!`);
});



// Start the server and listen on the defined port
app.listen(3000, () => console.log(`Server running on http://localhost:3000`));
