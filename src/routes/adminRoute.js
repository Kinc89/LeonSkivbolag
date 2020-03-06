const express = require("express");
const app = express.Router();
const { ROUTE, VIEW } = require("./variables");

const Album = require("../../model/album");
const getLastFmData = require('../functions/getLastFmData');

app.get(ROUTE.admin, async (req, res) => {
    res.render(VIEW.admin);
});

app.post(ROUTE.admin, async (req, res) => {
    
     // getting the url from admin input and sort it to get artist and album as strings.
    const urlFromAdmin = req.body.url;
    const arrayFromUrlFromAdmin = urlFromAdmin.split("/");
    const artist = arrayFromUrlFromAdmin[arrayFromUrlFromAdmin.length-2];
    const album = arrayFromUrlFromAdmin[arrayFromUrlFromAdmin.length-1];
    
    // send to the getLastFmData artist and album strings to fetch data on the album
    const data = await getLastFmData(artist, album);

    let releaseDate;
    let description;

    if (!data.album.wiki) { 
        releaseDate = "(Unknown)";
        description = "(Unknown)";
    } else {
        const releaseDateFullVersion = await data.album.wiki.published;
        const releaseDataAsArray = releaseDateFullVersion.split(" ");
        releaseDate = releaseDataAsArray[2].slice(0, 4);

        description = data.album.wiki.summary;
    }

    const newAlbum = await new Album({
        name: data.album.name,
        artist: data.album.artist,
        released: releaseDate,
        description: description,
        imgUrl: data.album.image[data.album.image.length-1]["#text"]
    }).save();

    console.log(newAlbum);

    res.redirect(ROUTE.admin);
    
});

module.exports = app;