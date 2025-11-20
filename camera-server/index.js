import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';    
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Mongo connection error:', err);
  }
}
connectDB(); 

// Simple Photo model (stores only URL + publicId)
const photoSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
);

const Photo = mongoose.model('Photo', photoSchema);


const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

