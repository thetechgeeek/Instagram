import express from 'express';
const router = express.Router();
import Post from '../models/postModel.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

router.post('/createpost', authMiddleware, (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(422).json({ error: 'Please add all the fields.' });
  }
  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

export default router;
