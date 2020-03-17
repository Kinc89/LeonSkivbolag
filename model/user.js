const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true, minlength: 4, maxlength: 24, trim: true },
    password: { type: String, required: true },
    status: { type: String, enum: ["user", "admin"], default: "user" },
    cart: [{
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' }
    }],
    order: []
})

userSchema.methods.addToCart = function (item) {
    this.cart.push({ itemId: item._id });
    return this.save();
}

const User = mongoose.model("User", userSchema);

module.exports = User;