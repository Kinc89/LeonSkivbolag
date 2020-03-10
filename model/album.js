// schema för en album
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    artist: String,
    price: { type: Number, default: () => Math.floor(Math.random() * (300 - 200)) + 200 },
    released: String,
    description: String,
    imgUrl: String
})

const album = mongoose.model('Album', schema);

module.exports = album;