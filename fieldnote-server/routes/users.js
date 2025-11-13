import express from 'express';
import { createUser } from '../controllers/usersController.js';
import { getUser } from '../controllers/usersController.js';
import { getUserWithNotes } from '../controllers/usersController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/:id', getUser);
router.get('/:id/notes', getUserWithNotes);

export default router;
