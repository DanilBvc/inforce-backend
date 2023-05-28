import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: true,
  },
  size: {
    type: Array,
    required: true,
  },
  comments: [{
    type: String,
    ref: 'Comment',
  }],
  id: {
    type: String,
    required: true,
  },
  imageUrl: String,
  count: {
    type: Number,
    default: 0
  }
});

export default mongoose.model('Product', productSchema);
