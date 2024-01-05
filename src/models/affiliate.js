const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AffiliateSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
}, { timestamps: true })


const Affiliate = mongoose.model('Affiliate', AffiliateSchema);

module.exports = Affiliate