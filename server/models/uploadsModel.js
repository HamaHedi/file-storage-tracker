import mongoose from 'mongoose';

const uploadSchema = mongoose.Schema({
  name: String,
  type: String,
  size: Number,

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var uploadedFile = mongoose.model('uploaded', uploadSchema);

export default uploadedFile;
