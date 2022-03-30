const mongoose = require('mongoose')

const adSchema = new mongoose.Schema({
    creator:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    title:{
        type: String,
        required: true,
        minlength: 3,
    },
    phone: {
        type: Number,
        required: true,
        minlength: 8,
        maxlength: 11
    },
    address: {
        type: String,
        required: true
    },
    notes:{
        type: Array,
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true
    }
})

const Ad = mongoose.model('ads', adSchema)

module.exports = Ad