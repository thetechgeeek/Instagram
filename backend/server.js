import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import path from 'path';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(postRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
    });
}

app.listen(process.env.PORT || 5000, console.log(`Server running on port ${process.env.PORT}`));
