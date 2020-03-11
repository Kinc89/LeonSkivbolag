const jwt = require("jsonwebtoken");
const config = require("../../config/config")

module.exports = (req, res, next) => {

    // req.cookies.jsonwebtoken
    const token = req.cookies.jsonwebtoken;
    console.log("TOKEN =>", token);
    
    // check whether the user has cookies
    if (token) {
        // jwt verifying method to check whether the cookie is valid or not
        const user = jwt.verify(token, config.secretKey);
        
        console.log("USER =>", user);
        // validating of data to server
        req = user; // here one can create a if statement to check whether the användare is an admin or …
        // "req" is what is sent to the router when using the middleware we just created.
        // next()
        next(); // allow to continue to the next route/function
    } else {
        res.send("You are not authorized.");
    }
}