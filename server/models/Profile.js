const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uid: {
        type: Number,
        required: true,
        unique: true
    },
    surname: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dp: {
        type: String,
        default: ""
    },
    year: {
        type: Number,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    RollNo: {
        type: String,
        required: true,
        unique: true
    },
    Mail: {
        type: String,
        required: true,
        unique: true
    },
    phoneNo: {
        type: Number,
        required: true,
        unique: true
    },
    DOB: {
        type: Date,
        required: true
    }
});

const UserProfile = mongoose.model('UserProfile', userSchema);
module.exports = UserProfile;
