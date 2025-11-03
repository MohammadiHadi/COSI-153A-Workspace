import express from 'express';
import { getNotes } from '../controllers/notesCtroller.js';
import { addNote } from '../controllers/notesCtroller.js';

const router = express.Router();

router.get('/', getNotes);
router.post('/', addNote);
export default router;
