const express = require('express');
const sassMiddleware = require('node-sass-middleware');
const app = express();
const port = 4000;
const Album = require('../../model/album');
const getLastFmData = require('../functions/getLastFmData');

const ROUTE = {
    root: '/',
    album: '/album',
    addAlbum: '/add-album'
};

const VIEW = {
    root: 'main',
    album: 'album',
    addAlbum: 'add-album'
};

app.use(sassMiddleware({ // tell sassMiddleware where src file and dest directory is
    src: 'sass',
    dest: 'public',
    // debug: true, // för att skriva ut data till konsollen
    outputStyle: 'compressed'
}));
// define a static folder, 'public'
app.use(express.static('public'));
// 
app.use(express.urlencoded({ extended: true }));
// define what view engine to use, ejs in this case
app.set('view engine', 'ejs');

// ROUTES

app.get(ROUTE.root, async (req, res) => {
    
    const data = await getLastFmData();

    await new Album({
        name: data.album.name,
        artist: data.album.artist,
        released: data.album.wiki.published,
        description: data.album.wiki.summary,
        imgUrl: data.album.image[data.album.image.length-1]["#text"]
    }).save();

    const albums = await Album.find();
    console.log(albums);

    res.render(VIEW.root, { albums });
});

app.get(ROUTE.album, async (req, res) => {
    res.status(200).render(VIEW.album, {});
})

app.get(ROUTE.addAlbum, async (req, res) => {
    res.status(200).render(VIEW.addAlbum, {});
})

app.post(ROUTE.addAlbum, (req, res) => {

    res.status(200).redirect(ROUTE.root);
})

module.exports = { app, port, express };