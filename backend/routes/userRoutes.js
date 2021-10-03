import express from 'express';
const router = express.Router();
import { User } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../middleware/authMiddleware.js';

router.get('/protected', authMiddleware, (req, res) => {
  res.send('hello');
});

router.post('/register', (req, res) => {
  const { name, username, email, password } = req.body;
  if (!name || !username || !email || !password) {
    return res
      .status(422)
      .json({ error: 'Please add all the required fields.' });
  }
  User.findOne({ email }).then((savedUser) => {
    if (savedUser) {
      return res.status(422).json({ error: 'User already exists.' });
    }
    bcrypt
      .hash(password, 5)
      .then((hashedPassword) => {
        const user = new User({
          name,
          username,
          email,
          password: hashedPassword,
        });
        user
          .save()
          .then((user) => {
            res.json({ message: 'Saved successfully.' });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ error: 'Please enter email or password.' });
  }
  User.findOne({ email: email }).then((SavedUser) => {
    if (!SavedUser) {
      return res.status(422).json({ error: 'Invalid Email/Password.' });
    }
    bcrypt
      .compare(password, SavedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign({ _id: SavedUser }, process.env.JWT_SECRET);
          res.json({ token });
        } else {
          return res.status(422).json({ error: 'Invalid Email/Password.' });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
export default router;
