const express = require("express");
const app = express.Router();
const { ROUTE, VIEW } = require("./variables");

// authentification modules
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User schema to database
const User = require("../../model/user");

app.get(ROUTE.signup, (req, res) => {
    res.render(VIEW.signup);
});

app.post("/signup", async (req, res) => {
    
    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Does user already exists in DB?
    const foundUser = await User.exists({ username: req.body.username })
    if (foundUser) { 
        res.redirect(VIEW.signup);
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
    res.send(users);

});

module.exports = app;