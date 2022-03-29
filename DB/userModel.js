const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 16
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
    },
    adminLevel: {
        type: Number,
        required: true,
        default: 0
    }
})

const User = mongoose.model('users', userSchema)

module.exports = User