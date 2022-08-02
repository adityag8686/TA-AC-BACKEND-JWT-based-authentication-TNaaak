var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// hash password
userSchema.pre("save", async function (req, res, next) {
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
    res.status(500).json(error);
    }
});
//  json web token
userSchema.methods.signToken = async function () {
    try {
        var token = jwt.sign(
        { user: this.id, email: this.email },
        "thisisthesecret"
        );
        return token;
    } catch (error) {
        return error;
    }
};

userSchema.methods.UserJson = function (token) {
    return {
        userId: this.userId,
        email: this.email,
        token: token,
    };
};
module.exports = mongoose.model("User", userSchema);
