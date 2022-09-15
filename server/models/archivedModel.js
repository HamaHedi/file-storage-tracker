import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;
const archivedSchema = mongoose.Schema({
  name: { type: String, required: false },
  type: { type: String, required: false },
  size: { type: Number, required: false },
  fileID: { type: String, required: false },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var archivedFile = mongoose.model('archived', archivedSchema);

export default archivedFile;
