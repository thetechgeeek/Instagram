import express from 'express';
const router = express.Router();
import { User } from '../models/userModel.js';
import Post from '../models/postModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../middleware/authMiddleware.js';

router.get('/protected', authMiddleware, (req, res) => {
  res.send('hello');
});

router.post('/register', (req, res) => {
  const { name, username, email, password, image, bio } = req.body;
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
          image: image,
          bio,
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
  User.findOne({ email: email })
    .then((SavedUser) => {
      if (!SavedUser) {
        return res.status(422).json({ error: 'Invalid Email/Password.' });
      }
      bcrypt
        .compare(password, SavedUser.password)
        .then((doMatch) => {
          if (doMatch) {
            const token = jwt.sign({ _id: SavedUser }, process.env.JWT_SECRET);
            const {
              _id,
              name,
              email,
              username,
              followers,
              following,
              image,
              bio,
            } = SavedUser;
            res.json({
              token,
              user: {
                _id,
                name,
                email,
                username,
                followers,
                following,
                image,
                bio,
              },
            });
          } else {
            return res.status(422).json({ error: 'Invalid Email/Password.' });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/user/:id', authMiddleware, (req, res) => {
  User.findById(req.params.id)
    .select('-password')
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        .populate('postedBy', '_id name')
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          res.json({ user, posts });
        });
    })
    .catch((err) => {
      return res.status(404).json({ error: 'User not found.' });
    });
});

router.put('/follow', authMiddleware, (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.user._id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { following: req.body.followId },
        },
        { new: true }
      )
        .select('-password')
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});

router.put('/unfollow', authMiddleware, (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.user._id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body.unfollowId },
        },
        { new: true }
      )
        .select('-password')
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});
router.put('/updateprofilepic', authMiddleware, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { image: req.body.image } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: 'Image cannot be updated.' });
      }
      res.json(result);
    }
  );
});
router.put('/updateprofile', authMiddleware, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        bio: req.body.bio,
        name: req.body.name,
        username: req.body.username,
      },
    },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: 'Proile cannot be updated.' });
      }
      res.json(result);
    }
  );
});

router.get('/allusers', authMiddleware, (req, res) => {
  User.find()
    .select('name username _id image')

    .then((users) => {
      res.json({ users });
    })
    .catch((err) => {
      console.log(err);
    });
});

export default router;
