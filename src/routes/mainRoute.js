const express = require("express");
const app = express.Router();
const { ROUTE, VIEW } = require("./variables");

const Album = require("../../model/album");

app.get(ROUTE.root, async (req, res) => {
    
    const albums = await Album.find();

    res.render(VIEW.root, { albums });
});

module.exports = app;