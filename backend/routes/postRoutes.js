import express from 'express';
const router = express.Router();
import Post from '../models/postModel.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

router.get('/allposts', authMiddleware, (req, res) => {
  Post.find()
    .populate('postedBy', '_id name username')
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/myposts', authMiddleware, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate('postedBy', '_id name username')
    .then((myPosts) => {
      res.json({ myPosts });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post('/createpost', authMiddleware, (req, res) => {
  const { location, caption, image } = req.body;
  if (!location || !caption || !image) {
    return res.status(422).json({ error: 'Please add all the fields.' });
  }
  req.user.password = undefined;
  const post = new Post({
    location,
    caption,
    image: image,
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
