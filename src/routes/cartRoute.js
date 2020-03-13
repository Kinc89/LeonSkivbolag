const express = require("express");
const app = express.Router();
const { ROUTE, VIEW } = require("./variables");

// needed?
const Album = require("../../model/album");
const User = require("../../model/user");

const verifyToken = require("../middlewares/verifyToken");

app.get(ROUTE.cart, verifyToken, async (req, res) => {

    if (!req.body.user) return res.render(VIEW.cart, { emptyCart: true })
    
    if (req.body.user.status === "guest") {
        const user = req.body.user;
        return res.render(VIEW.cart, { emptyCart: false, user })
    }
    
    

    const user = await User.findById({ _id: req.body.user._id });

    console.log(user);
    console.log(user.cart.length)

    res.render(VIEW.cart, { user });
});

module.exports = app;