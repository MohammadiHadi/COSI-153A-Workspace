import express from 'express';
import { getNotes, addNote, getNoteById, deleteNote, updateNote } from '../controllers/notesCtroller.js';
import upload from '../middleware/multerConfig.js';


const router = express.Router();

router.get('/', getNotes);
router.post('/', upload.single('photo'), addNote);
router.get('/:id', getNoteById);
router.delete('/:id', deleteNote);
router.patch('/:id', updateNote);
export default router;
