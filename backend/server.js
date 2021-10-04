import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.get('/', (req, res) => {
  res.send('Hello');
});

app.use(express.json());

app.use(userRoutes);
app.use(postRoutes);

app.listen(
  process.env.PORT || 5000,
  console.log(`Server running on port 5000`)
);
