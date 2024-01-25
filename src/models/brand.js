const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BrandSchema = new Schema({
    title: {
        type: String,
        required: true
    },
}, { timestamps: true })


const Brand = mongoose.model('Brand', BrandSchema);

module.exports = Brand