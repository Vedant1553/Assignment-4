import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import connectDB from './src/db/connect.js';
import taskRoutes from './src/routes/taskRoutes.js';
import errorMiddleware from './src/middleware/errorMiddleware.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(helmet());

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('TaskFlow DB API Running');
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});