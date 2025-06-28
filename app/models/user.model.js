const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    walletAddress: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    signature: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model('user', userSchema);

module.exports = {
  userModel,
};
