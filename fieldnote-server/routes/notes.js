import express from 'express';
import { getNotes } from '../controllers/notesCtroller.js';
import { addNote } from '../controllers/notesCtroller.js';
import { getNoteById } from '../controllers/notesCtroller.js';
import { deleteNote } from '../controllers/notesCtroller.js';
import { updateNote } from '../controllers/notesCtroller.js';

const router = express.Router();

router.get('/', getNotes);
router.post('/', addNote);
router.get('/:id', getNoteById);
router.delete('/:id', deleteNote);
router.patch('/:id', updateNote);
export default router;
