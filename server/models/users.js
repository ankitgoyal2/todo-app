const mongoose = require('mongoose');

var userModel = mongoose.model(
    "users",
    new mongoose.Schema({
        email: { type: String, required: true, minlength: 1, trim: true }
    })
);

module.exports = {
    userModel,
}