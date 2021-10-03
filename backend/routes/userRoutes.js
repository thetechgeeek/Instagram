import express from 'express';
const router = express.Router();
import { User } from '../models/userModel.js';
import bcrypt from 'bcryptjs';

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

export default router;
