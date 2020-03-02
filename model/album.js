// schema för en album
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    artist: String,
    titles: [],
    price: Number,
    description: String,
    imgUrl: String
})

const album = mongoose.model('album', schema);

module.exports = album;