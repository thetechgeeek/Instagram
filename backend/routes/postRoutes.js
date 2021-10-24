import express from 'express';
const router = express.Router();
import Post from '../models/postModel.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

router.get('/allposts', authMiddleware, (req, res) => {
  Post.find()
    .populate('postedBy', '_id name username image')
    .populate('comments.postedBy', '_id name username')
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/followerPosts', authMiddleware, (req, res) => {
  Post.find({ postedBy: { $in: req.user.following } })
    .populate('postedBy', '_id name username image')
    .populate('comments.postedBy', '_id name username')
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/myposts', authMiddleware, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate('postedBy', '_id name username image')
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

router.put('/like', authMiddleware, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    { new: true }
  )
    .populate('postedBy', '_id name username image')
    .populate('comments.postedBy', '_id name username')
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put('/unlike', authMiddleware, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    { new: true }
  )
    .populate('postedBy', '_id name username image')
    .populate('comments.postedBy', '_id name username')
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put('/comment', authMiddleware, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    { new: true }
  )
    .populate('postedBy', '_id name username image')
    .populate('comments.postedBy', '_id name username')
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.delete('/deletepost/:id', authMiddleware, (req, res) => {
  Post.findOne({ _id: req.params.id })
    .populate('postedBy', '_id')
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => res.json(result))
          .catch((err) => {
            console.log(err);
          });
      }
    });
});
export default router;
