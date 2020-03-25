const express = require("express");
const app = express.Router();
const { ROUTE, VIEW } = require("./variables");

const User = require("../../model/user");

const bcrypt = require("bcryptjs");

app.get(ROUTE.resetToken, async (req, res) => {

    const user = await User.findOne({ resetToken: req.params.token, expirationToken: { $gt: Date.now() } })

    if (!user) return res.redirect(ROUTE.signup);

    res.render(VIEW.resetToken, { user });

});

app.post(ROUTE.resetToken, async (req, res) => {

    console.log(req.body)

    const user = await User.findOne({ _id: req.body.userId })

    console.log("user in resetToken POST:", user)

    // problem here
    user.password = await bcrypt.hash(req.body.password, 10);

     // reset these two
    user.resetToken = undefined;
    user.expirationToken = undefined;

    console.log("user in resetToken POST after:", user)

    await user.save();

    res.redirect(ROUTE.login);

});

module.exports = app;