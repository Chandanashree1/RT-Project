const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String,
            required: true
        },
        test: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin',
            required: true
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin'
        },
        isDelete: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)
module.exports = userSchema