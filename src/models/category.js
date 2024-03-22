const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    videos: {
        type: String,
        required: false
    },
}, { timestamps: true })


const Category = mongoose.model('Category', CategorySchema);

module.exports = Category