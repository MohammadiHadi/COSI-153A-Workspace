import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';    
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Mongo connection error:', err);
  }
}
connectDB(); 

cloudinary.config();

const upload = multer({
  storage: multer.memoryStorage(), // file stored in RAM as buffer
});


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

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // Make sure we have a file
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const fileBuffer = req.file.buffer;

    // Turn the image buffer into base64 text
    const base64 = fileBuffer.toString('base64');

    // Wrap that base64 text in a standard data: URL format
    const dataUri = `data:image/jpeg;base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'camera-demo',
    });
 // Save info in MongoDB
    const photo = await Photo.create({
      url: result.secure_url,
      publicId: result.public_id,
    });
    // const photo = new Photo({
    //   url: result.secure_url,
    //   publicId: result.public_id,
    // });

    // await photo.save();

    // Respond to client (Expo app)
    res.status(201).json({
      success: true,
      photo: {
        id: photo._id,
        url: photo.url,
        publicId: photo.publicId,
      },
    });
  } catch (err) {
    console.error('Error in /upload:', err);
    res.status(500).json({
      success: false,
      error: 'Server error while uploading image',
    });
  }
});


app.get('/photos', async (req, res) => {
  try {
    const photos = await Photo.find(); 
    res.json({
      success: true,
      photos: photos.map((p) => ({
        id: p._id,
        url: p.url,
        publicId: p.publicId,
      })),
    });
  } catch (err) {
    console.error('Error in GET /photos:', err);
    res.status(500).json({ success: false, error: 'Server error while fetching photos' });
  }
});



app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

