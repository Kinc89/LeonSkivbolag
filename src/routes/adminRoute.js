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

    console.log("IMAGES FROM ALBUM FROM LASTFM => ", data.album.image);

    // manipulating the image URL to get a 1280x1280 px.



    const imgUrlSmall = data.album.image[data.album.image.length-1]["#text"];
    const imgUrl = imgUrlSmall.replace("300x300", "1280x1280");
    // const imgUrlSmall = "https://lastfm.freetls.fastly.net/i/u/300x300/17b8c0dd81e6adb14665afab1676706e.png";
    
    console.log("IMG URL =>", imgUrl);



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
        imgUrl: imgUrl
    }).save();

    // console.log("NEW ALBUM IN DB => ", newAlbum);

    res.redirect(ROUTE.admin);
    
});

module.exports = app;