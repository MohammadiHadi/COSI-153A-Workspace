import express from 'express';
import notesRoutes from './routes/notes.js';
import usersRoutes from './routes/users.js';
import { logger } from './middleware/logInfo.js';
import connectDB from './middleware/connectMongo.js'; 
import cors from 'cors'

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: '*'}));
app.use(logger);
app.use('/notes', notesRoutes);
app.use('/users', usersRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));