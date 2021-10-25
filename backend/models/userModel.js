import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String, default: '' },
  image: {
    type: String,
    default:
      'https://res.cloudinary.com/thetechgeeek/image/upload/v1635022297/Default_lnrx5x.jpg',
  },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const User = mongoose.model('User', userSchema);

export { User };
