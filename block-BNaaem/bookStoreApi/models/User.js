var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var { token } = require("morgan");

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
    bookId: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
    },
    ],
});

// Before registring the user hash the password

userSchema.pre("save", async function (req, res, next) {
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        res.status(500).json(error);
    }
});

// get the json web token  here

userSchema.methods.signToken = async function () {
    try {
        var token = jwt.sign(
        { user: this.id, email: this.email },
        "thisisthesecret"
        );
        return token;
    } catch (error) {
        return "there is an error while generating  the token and the error is", e;
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