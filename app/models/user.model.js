const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        walletAddress: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: false,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: false,
            trim: true,
        },
    },
    { timestamps: true }
)

const userModel = mongoose.model('user', userSchema)

module.exports = {
    userModel,
}
