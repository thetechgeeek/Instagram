import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();
app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(
  process.env.PORT || 5000,
  console.log(`Server running on port 5000`)
);
