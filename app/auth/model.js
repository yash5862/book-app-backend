const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    email: {type: String, require: true,  unique: true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    gender: { type: String, default: 'male' },
    dateOfBirth: {type: String, require: true},
    password: {type: String, require: true},
    isRegistered: {type: Boolean, default: false},
    isDeleted: {type: Boolean, default: false}
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', UsersSchema);