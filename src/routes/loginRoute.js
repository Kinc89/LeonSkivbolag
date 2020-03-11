const express = require("express");
const app = express.Router();
const { ROUTE, VIEW } = require("./variables");
const config = require("../../config/config");

// User schema to database
const User = require("../../model/user");

// authentification modules
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("./verifyToken");

let foundUser = true;
let invalidUser = false;

app.get(ROUTE.login, (req, res) => {

    res.render(VIEW.login, { foundUser: true, invalidUser: false });

});

app.post(ROUTE.login, async (req, res) => {

    const user = await User.findOne({ username: req.body.username });

    console.log("USER IS ->", user);

    if (!user) return res.render(VIEW.login, { foundUser: false });

    // compare with database info
    const validUser = await bcrypt.compare(req.body.password, user.password); // true?

    console.log(validUser);

    if (!validUser) return res.render(VIEW.login, { foundUser: true, invalidUser: true });

    console.log(config.secretKey);


    jwt.sign({ user }, config.secretKey, (err, token) => { // the string secretKey must come from the config file. 

        if (err) return res.redirect("/login");

        if (token) {
            console.log(token);
            // cookie-parser must be installed and required in index.js for that to work
            
            if (!req.cookie) {
                res.cookie("jsonwebtoken", token, { maxAge: 3600000, httpOnly: true })
            };

            res.render(VIEW.admin, { user });
        }

    });

});

module.exports = app;