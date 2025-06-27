const mongoose = require('mongoose')

const meetingSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const meetingModel = mongoose.model('meeting', meetingSchema)
