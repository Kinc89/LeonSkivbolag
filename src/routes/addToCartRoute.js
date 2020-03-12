const express = require("express");
const app = express.Router();
const { ROUTE, VIEW } = require("./variables");

const Album = require("../../model/album");
const User = require("../../model/user");

const verifyToken = require("./verifyToken");

app.get(ROUTE.addToCart, verifyToken, async (req, res) => {

const user = await User.findById({ _id: req.body.user._id });

const albumToAdd = await Album.findById({ _id: req.params.id });

user.cart.push(albumToAdd);

console.log(user);

await user.save();




res.redirect(ROUTE.root);

});

module.exports = app;