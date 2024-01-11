const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HeroSchema = new Schema({
    title: {
        type: String,
        required: true
    },
}, { timestamps: true })


const Hero = mongoose.model('Hero', HeroSchema);

module.exports = Hero