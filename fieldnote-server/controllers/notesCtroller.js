import 'dotenv/config';
import { Note } from '../models/notes.js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config();


export const getNotes = async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
};



export const addNote = async (req, res) => {
  try {
    let photoUrl;

    if (req.file) {
      const buffer = req.file.buffer;
      const base64 = buffer.toString('base64');
      const dataUri = `data:image/jpeg;base64,${base64}`;

      const result = await cloudinary.uploader.upload(dataUri, {
        folder: 'fieldnote-notes',
      });

      photoUrl = result.secure_url;
    }

    const note = new Note({
      ...req.body,
      photoUrl,
    });

    await note.save();
    res.status(201).json(note);
  } catch (err) {
    console.error('Error creating note:', err);
    res.status(400).json({ error: err.message });
  }
};



export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deleted = await Note.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


