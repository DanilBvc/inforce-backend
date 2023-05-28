import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  id: {
    type: String,
    unique: true
  },
  productId: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,

})
export default mongoose.model('Comment', commentSchema)
