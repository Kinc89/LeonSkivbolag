const jwt = require("jsonwebtoken");
const config = require("../../config/config")
const { ROUTE, VIEW } = require("../routes/variables");

module.exports = (req, res, next) => {

    console.log("req.body when entering verifyToken", req.body);
    console.log("req.originalUrl", req.originalUrl);

    // req.cookies.jsonwebtoken
    const token = req.cookies.jsonwebtoken;

    // check whether the user has cookies
    if (token) {
        console.dir("THERE IS A TOKEN IN THE COOKIE.");

        // jwt verifying method to check whether the cookie is valid or not
        const validCookie = jwt.verify(token, config.secretKey);

        console.log("**** VERIFY TOKEN START ****")
        console.log("COOKIE FROM CLIENT -> ", validCookie);
        console.log("USER FROM COOKIE -> ", validCookie.user.status);
        console.log("**** VERIFY TOKEN END ****");
        
        req.validCookie = validCookie;

        next(); // allow to continue to the next route/function
    } else if (req.originalUrl == ROUTE.signup) {
        next();
    } else {
        res.redirect(ROUTE.error403);
    }
}