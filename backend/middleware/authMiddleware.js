import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { User } from '../models/userModel.js';

export const authMiddleware = (req, res, next) => {
  //grabbing authorization from header
  const { authorization } = req.headers;

  //if auth not present
  if (!authorization) {
    return res.status(401).json({ error: 'You must be logged in.' });
  }

  //retreiving token from auth string
  //replacing auth string - "Bearer xxxxx" with "xxxxx"
  const token = authorization.replace('Bearer ', '');

  //verifying with jwt by passing secret key
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: 'You must be logged in.' });
    }

    const { _id } = payload;
    User.findById(_id).then((userData) => {
      req.user = userData;
    });
    next();
  });
};
