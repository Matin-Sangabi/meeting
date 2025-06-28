const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const meetingModel = mongoose.model('meeting', meetingSchema);

module.exports = {
  meetingModel,
};
