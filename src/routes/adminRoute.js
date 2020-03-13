const express = require("express");
const app = express.Router();
const { ROUTE, VIEW } = require("./variables");

const Album = require("../../model/album");
const getLastFmData = require('../functions/getLastFmData');
const checkIfAlbumExists = require('../functions/checkIfAlbumExists');
const setPrice = require('../functions/setPrice');

let user;

app.get(ROUTE.admin, async (req, res) => {
    res.render(VIEW.admin, { user, invalidAlbum: false, albumAdded: false, existingAlbum: false, error: false });
});

app.post(ROUTE.admin, async (req, res) => {
    
     // getting the url from admin input and sort it to get artist and album as strings.
    const urlFromAdmin = req.body.url;
    const arrayFromUrlFromAdmin = urlFromAdmin.split("/");
    const artist = arrayFromUrlFromAdmin[arrayFromUrlFromAdmin.length-2];
    const album = arrayFromUrlFromAdmin[arrayFromUrlFromAdmin.length-1];
    
    // send to the getLastFmData artist and album strings to fetch data on the album
    const data = await getLastFmData(artist, album);

    if (data.error) {
        res.render(VIEW.admin, { user: undefined, invalidAlbum: false, albumAdded: false, existingAlbum: false, error: true });
    }

    // manipulating the image URL to get a 1280x1280px
    const imgUrlDefault = data.album.image[data.album.image.length-1]["#text"];
    const imgUrl = imgUrlDefault.replace("300x300", "1280x1280");

    // if statement to sort out releaseDate and description in the case of no wiki on the received data (data.album.wiki == undefined).
    let releaseDate;
    let description;

    // check whether the album already exists in the database.
    const foundAlbum = await checkIfAlbumExists(data.album.artist, data.album.name);

    if (!data.album.wiki) { 

        res.render(VIEW.admin, { user: undefined, invalidAlbum: true, data, albumAdded: false, existingAlbum: false, error: false });

    } else if (foundAlbum){

        res.render(VIEW.admin, { user: undefined, invalidAlbum: false, data, albumAdded: false, existingAlbum: true, error: false });

    } else {
        
        // filter the release date data to get only the release year.
        const releaseDateFullVersion = await data.album.wiki.published;
        const releaseDataAsArray = releaseDateFullVersion.split(" ");
        releaseDate = releaseDataAsArray[2].slice(0, 4);

        // filter the description data to delete the link at the end.
        const descriptionFullVersion = await data.album.wiki.summary;
        const indexOfLink = descriptionFullVersion.indexOf("<a");
        const descriptionShortVersion = descriptionFullVersion.substring(0, indexOfLink).trimEnd();
        description = descriptionShortVersion;

        // set price
        const calculatedPrice = await setPrice(data.album.listeners);

        console.log(calculatedPrice);
    
        const newAlbum = await new Album({
            name: data.album.name,
            artist: data.album.artist,
            price: calculatedPrice,
            released: releaseDate,
            description: description,
            imgUrl: imgUrl,
            numListeners: data.album.listeners
        }).save();

        const newAlbumInDb = await Album.findOne({ _id: newAlbum._id });

        console.log("NEW ALBUM IN DB > ", newAlbumInDb);

        res.render(VIEW.admin, { user: undefined, invalidAlbum: false, albumAdded: true, existingAlbum: false, newAlbumInDb, error: false });

    }
    
});

module.exports = app;