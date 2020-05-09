import mongoose from 'mongoose';

const { Schema } = mongoose;

const StorySchema = new Schema({
  title: String,
  type: String,
  points: Number,
  requester: mongoose.ObjectId,
  owner: mongoose.ObjectId,
  followers: [{}],
  description: String,
  labels: [String],
  tasks: [{}],
  category: String,
  finished: Boolean,
  delivered: Boolean,
  projectId: mongoose.ObjectId,
});

const Story = mongoose.model('Story', StorySchema);

export default Story;
