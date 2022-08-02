const bcrypt = require("bcrypt");
let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    name: {type: String,required: true},
    email: {type: String,required: true,unique: true },
    password: {type: String,required: true},
});


userSchema.pre("save", async (req, res, next) => {
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = mongoose.model("User", userSchema);