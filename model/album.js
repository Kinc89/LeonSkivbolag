// schema för en album
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    artist: String,
    price: Number,
    released: String,
    description: String,
    imgUrl: String,
    numListeners: Number
})

const album = mongoose.model('Album', schema);

module.exports = album;