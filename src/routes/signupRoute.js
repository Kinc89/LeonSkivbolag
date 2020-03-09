const express = require("express");
const app = express.Router();
const { ROUTE, VIEW } = require("./variables");

const User = require("../../model/user");

app.get(ROUTE.signup, (req, res) => {
    res.render(VIEW.signup);
});

app.post("/signup", async (req, res) => {
    
    // const salt = await bcrypt.genSalt(10); 
    // // generate salt "power 10", see doc for more info. If await, don't use getSaltSync, if getSaltSync, no await…

    // const hashPassword = await bcrypt.hash(req.body.password, salt); 
    // // take the input from user, add "salt" and hash it with the module. If await, don't use hashSync, if hashSync, no await…

    adminUsers = ["julia", "balthazar", "leon", "yamandu", "oskar"];

    if (adminUsers.includes(req.body.username)) {
        const status = "admin";
    }

    await new User({
        email: req.body.email,
        username: req.body.username,
        status: status,
        password: req.body.password
    }).save();
    
    const user = await User.findOne({ email: req.body.email }); // or find (worked)?
    console.log(user);
    // res.redirect("userProfile");
    res.send(user);

});

module.exports = app;