const express = require("express");
const app = express.Router();
const { ROUTE, VIEW } = require("./variables");
const config = require("../../config/config");

// const Album = require("../../model/album");
const User = require("../../model/user");

const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verifyToken");
const checkUser = require("../middlewares/checkUser");

app.get(ROUTE.removeAlbum, verifyToken, checkUser, async (req, res) => {
        
        const album = await Album.findOne( { _id: req.params.id });

        await album.removeItem(req.params.id);

        album.id({ _id: req.params.id }).remove();
        await album.save();

        res.render(ROUTE.root);

});

module.exports = app;