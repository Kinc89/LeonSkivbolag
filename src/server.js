const express = require('express');
const sassMiddleware = require('node-sass-middleware');
const app = express();
const port = 4000;
const album = require('../model/album');

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
    dest: 'public/css',
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
    const albumsList = await album.find();
    res.status(200).render(VIEW.root, { albumsList });
});

app.get(ROUTE.album, async (req, res) => {
    res.status(200).render(VIEW.album, {});
})

app.get(ROUTE.addAlbum, async (req, res) => {
    res.status(200).render(VIEW.addAlbum, {});
})

app.post(ROUTE.addAlbum, (req, res) => {
    // spara ny album
    new album({
        name: req.body.name,
        artist: req.body.artist,
        price: req.body.price,
        description: req.body.description,
        imgUrl: req.body.imgUrl
    }).save(); // och spara till databasen

    res.status(200).redirect(ROUTE.root);
})

module.exports = { app, port, express };