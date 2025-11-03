import express from 'express';
import notesRoutes from './routes/notes.js';
import { logger } from './middleware/logInfo.js';
import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Mongo connection error:', err));



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use('/notes', notesRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
