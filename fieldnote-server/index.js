import express from 'express';
import notesRoutes from './routes/notes.js';
import { logger } from './middleware/logInfo.js';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Mongo connection error:', err));

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Mongo connection error:', err);
  }
}

connectDB(); // Call the async function


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: '*'}));
app.use(logger);
app.use('/notes', notesRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
