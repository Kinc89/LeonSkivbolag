const jwt = require("jsonwebtoken");
const config = require("../../config/config")
const { ROUTE, VIEW } = require("../routes/variables");

module.exports = (req, res, next) => {

    // console.log("**** CHECK USER START ****")

    if (!req.validCookie) return res.redirect(ROUTE.error403);
    
    if (req.validCookie.user.status == "user") {
        next();                
        // console.log("**** CHECK USER END ****")
        return
    } else {
        // console.log("**** CHECK USER END: STATUS BUT NOT USER: ACCESS DENIED ****")
        return res.redirect(ROUTE.error403);
    }
    
}