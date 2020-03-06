const express = require("express");
const albumRoute = express.Router();
const { ROUTE, VIEW } = require("./variables");

const Album = require("../../model/album");
const getLastFmData = require('../functions/getLastFmData');

app.get(ROUTE.album, async (req, res) => {
    
    const data = await getLastFmData();

    await new Album({
         name: data.album.name,
         artist: data.album.artist,
         released: data.album.wiki.published,
         description: data.album.wiki.summary,
         imgUrl: data.album.image[data.album.image.length-1]["#text"]
     }).save();

    const albums = await Album.find();
    console.log(req);

    res.render(VIEW.album, { albums });
});

module.exports = albumRoute;