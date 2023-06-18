import express from 'express';
import cors from 'cors';
import './models/associations.js';
import categoryRoutes from './routes/categoryRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/', categoryRoutes);
app.use('/', userRoutes);

export default app;