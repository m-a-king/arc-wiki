import express from 'express';
import cors from 'cors';
import './models/associations.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/', userRoutes);
app.use('/', categoryRoutes);
app.use('/', productRoutes);

export default app;