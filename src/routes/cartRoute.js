const express = require("express");
const app = express.Router();
const { ROUTE, VIEW } = require("./variables");

const User = require("../../model/user");

const verifyToken = require("../middlewares/verifyToken");

app.get(ROUTE.cart, verifyToken, async (req, res) => {

    if (!req.validCookie) {
        const user = { status: 'visitor' };
        res.render(VIEW.cart, { emptyCart: true, user })

    }
    
    if (req.validCookie.user.status === "guest") {
        const user = req.validCookie.user;
        return res.render(VIEW.cart, { emptyCart: false, user })
    }
    
    const user = await User.findById({ _id: req.validCookie.user._id });

    res.render(VIEW.cart, { emptyCart: false, user });
});

module.exports = app;