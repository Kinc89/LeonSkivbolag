const express = require("express");
const app = express.Router();
const { ROUTE, VIEW } = require("./variables");
const config = require("../../config/config");

const Album = require("../../model/album");
const User = require("../../model/user");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verifyToken");


app.get(ROUTE.addToCart, verifyToken, async (req, res) => {

    if (!req.body.user) {

        const user = {
            status: "guest",
            cart: [] 
        }

        const albumToAdd = await Album.findById({ _id: req.params.id });
        user.cart.push(albumToAdd);

        console.log(user);

        jwt.sign({ user }, config.secretKey, (err, token) => {

            if (err) return res.redirect(ROUTE.root);
    
            if (token) {
                if (!req.cookie) {
                    res.cookie("jsonwebtoken", token, { maxAge: 3600000, httpOnly: true })
                };
                return res.redirect(ROUTE.root);
            }
        });
        return
    }


const user = await User.findById({ _id: req.body.user._id });

const albumToAdd = await Album.findById({ _id: req.params.id });

user.cart.push(albumToAdd);

console.log(user);

await user.save();

res.redirect(ROUTE.root);

});

module.exports = app;