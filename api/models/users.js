const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['ADMIN', 'HELPER', 'USER'],
            default: 'USER'
        }
    },
    {
        versionKey: false,
        timestamps: true
    });

module.exports = (app) => mongoose.model('users', UserSchema);
