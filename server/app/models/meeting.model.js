const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    time: {
      start_time: { type: Date },
      end_time: { type: Date },
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
