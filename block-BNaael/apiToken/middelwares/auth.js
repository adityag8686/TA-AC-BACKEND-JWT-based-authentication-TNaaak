var jwt = require("jsonwebtoken");
module.exports = {
    verifyUser: async (req, res, next) => {
        try {
        var token = req.headers.authorization;
        if (token) {
            jwt.verify(token, "thisisthesecret", function (err, decode) {
            req.user = decode;
            return next();
        });
        }
        res.json({ error: "token not available" });
        } catch (e) {
        res.json({ error: "token not matched" });
    }
    },
};