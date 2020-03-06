const express = require("express");
const app = express.Router();
const { ROUTE, VIEW } = require("./variables");

const Album = require("../../model/album");
const getLastFmData = require('../functions/getLastFmData');

app.get(ROUTE.root, async (req, res) => {
    
    // const data = await getLastFmData();

    // await new Album({
    //     name: data.album.name,
    //     artist: data.album.artist,
    //     released: data.album.wiki.published,
    //     description: data.album.wiki.summary,
    //     imgUrl: data.album.image[data.album.image.length-1]["#text"]
    // }).save();

    const albums = await Album.find();
    console.log(albums);

    res.render(VIEW.root, { albums });
});

module.exports = app;