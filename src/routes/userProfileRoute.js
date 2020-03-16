const express = require("express");
const app = express.Router();
const { ROUTE, VIEW } = require("./variables");

const User = require("../../model/user");

const verifyToken = require("../middlewares/verifyToken");

app.get(ROUTE.userProfile, verifyToken, async (req, res) => {

    console.log("REQ BODY USER ->", req.validCookie.user);

    const user = await User.findById({ _id: req.validCookie.user._id });

    console.log(user);

    res.render(VIEW.userProfile, { user });
});

module.exports = app;