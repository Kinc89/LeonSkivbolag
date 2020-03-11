const express = require("express");
const app = express.Router();
const { ROUTE, VIEW } = require("./variables");

// authentification modules
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User schema to database
const User = require("../../model/user");

let foundUser = false;

app.get(ROUTE.signup, (req, res) => {
    res.render(VIEW.signup, { foundUser: false });
});

app.post("/signup", async (req, res) => {
    
    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Does user already exist in DB?
    const foundUser = await User.exists({ username: req.body.username })
    if (foundUser) { 
        res.render(VIEW.signup, { foundUser: true });
    }
    
    // Can the new user become an admin?
    let status;
    const adminUsers = ["julia", "balthazar", "leon", "yamandu", "oskar"];
    if (adminUsers.includes(req.body.username)) {
        status = "admin";
    }

    console.log(status)

    await new User({
        email: req.body.email,
        username: req.body.username,
        password: hashPassword,
        status: status
    }).save();
    
    const users = await User.find(); // or find (worked)?
    console.log(users);
    // res.redirect("userProfile");
    res.redirect(VIEW.login);

});

module.exports = app;