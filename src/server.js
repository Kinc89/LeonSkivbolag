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

    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Authorization", "Bearer BQD-Gy5EwVOGa6K5kWUsTTbhiQZWqQUxt1Vd4nPMKa9tmOdTxhEt8eA-Nh0DodEHkxqrd42_aSdQvEbC3dsq0F8ilc5UT17Fh1s2-hW7ol_EhdI-1WpWOGIcwFholflyWux6NNbUnn3NRea87x2g8VLrKbLpc9w");
    
    const requestOptions = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer BQD-Gy5EwVOGa6K5kWUsTTbhiQZWqQUxt1Vd4nPMKa9tmOdTxhEt8eA-Nh0DodEHkxqrd42_aSdQvEbC3dsq0F8ilc5UT17Fh1s2-hW7ol_EhdI-1WpWOGIcwFholflyWux6NNbUnn3NRea87x2g8VLrKbLpc9w'
        },
      body: '',
      redirect: 'follow'
    };
    
    const response = await fetch("https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj", requestOptions);
    
    console.log(response);

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