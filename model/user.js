const mongoose = require("mongoose");

const userSchema = {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        status: { type: String, enum: [ "user", "admin" ], default: "user" },
        cart: []
    }

const User = mongoose.model("User", userSchema);

module.exports = User;