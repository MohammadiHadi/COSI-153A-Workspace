import express from 'express';
import notesRoutes from './routes/notes';
import router from './routes/notes.js';
const app = express();

// function logger(req, res, next) {
//   console.log(`${req.method} ${req.url}`);
//   next(); // pass control to the next middleware or route
// }

// const getNotes = (req, res) => {
//   res.json([
//     { title: 'Hello', body: 'This is my first note', createdAt: Date.now()}
//   ]);
// }

// app.use(logger);
app.use('/notes',()=>{
    console.log('Middleware for /notes route');

}, router);

// app.get('/status', logger, (req, res) => {
//   res.json({ status: 'OK', timestamp: Date.now() });
// });

app.listen(3000, () => console.log('Server running on port 3000'));
