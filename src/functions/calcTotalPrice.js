const User = require("../../model/user");

async function calcTotalPrice(userCart) {

    // get the data from the cart of the user from the DB
    console.log("userCart in calcTotalPrice", userCart);

    let totalPrice = 0;

    userCart.forEach(item => {
        totalPrice += item.price;
    });

    return totalPrice;

}

module.exports = calcTotalPrice;