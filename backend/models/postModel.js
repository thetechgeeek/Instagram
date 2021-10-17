import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  location: { type: String, required: true },
  caption: { type: String, required: true },
  image: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Post = mongoose.model('Post', postSchema);

export default Post;
