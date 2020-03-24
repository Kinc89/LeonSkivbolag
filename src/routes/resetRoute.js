const express = require("express");
const app = express.Router();
const { ROUTE, VIEW } = require("./variables");
const port = process.env.PORT || 4000;

const config = require("../../config/config");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");

const User = require("../../model/user");

const transport = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: config.sendgridkey
    }
})
);

app.get(ROUTE.reset, (req, res) => {

    res.render(VIEW.reset);
    
});

app.post(ROUTE.reset, async (req, res) => {

    console.dir(req.body.resetMail);

    const user = await User.findOne({ email: req.body.resetMail })

    if (!user) return res.redirect(ROUTE.signup);

    crypto.randomBytes(32, async (err, token) => {
        
        if (err) return res.redirect(ROUTE.signup);
        
        const resetToken = token.toString("hex");

        user.resetToken = resetToken;
        user.expirationToken = Date.now() + 100000;

        await user.save();

        transport.sendMail({
            to: user.email,
            from: "no-reply@skivbolaget.com",
            subject: "Reset your password",
            html: `Hello! Please follow this <a href="http://localhost:${port}/reset/${resetToken}">link</a> in order to reset your password and create a new one.`
        });

        res.redirect(ROUTE.login);

    });

});

module.exports = app;