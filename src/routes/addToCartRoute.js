const express = require("express");
const app = express.Router();
const { ROUTE, VIEW } = require("./variables");
const config = require("../../config/config");

const Album = require("../../model/album");
const User = require("../../model/user");

const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verifyToken");


app.get(ROUTE.addToCart, verifyToken, async (req, res) => {

    console.log("req.validCookie -> ", req.validCookie)

    // in the case of no cookie (no user logged in)
    if (!req.validCookie) {

        const user = {
            status: "guest",
            cart: [] 
        }
        const albumToAdd = await Album.findById({ _id: req.params.id });
        user.cart.push(albumToAdd);
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
        
    } else {

        // in the case that the user is already logged in (there is a cookie)
        const user = await User.findById({ _id: req.validCookie.user._id });
        const albumToAdd = await Album.findById({ _id: req.params.id });

        console.log("USER ->", user);
        
        // user.cart.forEach(item => {
        //     user.cart.push(albumToAdd);
        // });

        await user.save();

        res.redirect(ROUTE.root);

    }

});

module.exports = app;