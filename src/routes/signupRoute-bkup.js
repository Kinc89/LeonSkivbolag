const express = require("express");
const app = express.Router();
const { ROUTE, VIEW } = require("./variables");
const config = require("../../config/config")

// authentification modules
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const verifyToken = require("../middlewares/verifyToken");

// User schema to database
const User = require("../../model/user");

app.get(ROUTE.signup, verifyToken, (req, res) => {

    if (!req.body.user || req.body.user.status === "guest") return res.render(VIEW.signup, { foundUser: false });

    if (req.body.user.status === "user") return res.redirect(ROUTE.userProfile);

    if (req.body.user.status == "admin") return res.redirect(ROUTE.admin);

});

app.post(ROUTE.signup, async (req, res) => {
    
    // generate salt and hash the password input
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

    // Is the user a guest with a cookie containing a cart?
    const token = req.cookies.jsonwebtoken;

    if (token) {
        
        // Start here on monday.
        const user = jwt.verify(token, config.secretKey);

        console.log("user from cookie ->", user);

        const cart = [];
        
        cart.push(user.cart);
    
        const UserFromGuest = await new User({
            email: req.body.email,
            username: req.body.username,
            password: hashPassword,
            status: status,
            cart: cart
        }).save();
        
        const newUserFromGuest = await User.findOne({ username: UserFromGuest.username });
        console.log("newUser from Guest ->", newUserFromGuest);

        return res.redirect(VIEW.login);
        
    } else {
    
        const user = await new User({
            email: req.body.email,
            username: req.body.username,
            password: hashPassword,
            status: status
        }).save();
        
        const newUser = await User.findOne({ username: user.username });
        console.log("newUser ->", newUser);
        
        res.redirect(VIEW.login);

    }

});

module.exports = app;