import express from 'express';
import { User } from '../models/userModel.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Users screen');
});

router.post('/register', (req, res) => {
  const { name, username, email, password } = req.body;
  if (!name || !username || !email || !password) {
    return res
      .status(422)
      .json({ error: 'Please add all the required fields.' });
  }
  User.findOne({ email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: 'User already exists.' });
      }
      const user = new User({
        name,
        username,
        email,
        password,
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

export default router;
