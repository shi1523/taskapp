const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    minlength: [1, 'Title must be at least 1 character'],
    maxlength: [200, 'Title must not exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description must not exceed 1000 characters']
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'in-progress', 'completed'],
      message: 'Status must be pending, in-progress, or completed'
    },
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create indexes for better query performance
taskSchema.index({ userId: 1, status: 1 });
taskSchema.index({ userId: 1, createdAt: -1 });

// Update timestamp on save
taskSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Update timestamp on findOneAndUpdate
taskSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

module.exports = mongoose.model('Task', taskSchema);
