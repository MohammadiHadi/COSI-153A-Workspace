import { Note } from '../models/notes.js';


// export const getNotes = (req, res) => {
//   res.json(notes);
// }

// export const addNote = (req, res) => {
//   const { title, body } = req.body;
//   const newNote = { title, body, createdAt: Date.now() };
//   notes.push(newNote);
//   res.json(notes);
// }

export const getNotes = async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
};



export const addNote = async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.status(201).json(note);
  } catch (err) {
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

