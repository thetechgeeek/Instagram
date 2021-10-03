import express from 'express';

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
  res.json({ message: 'Successfully Posted.' });
});
