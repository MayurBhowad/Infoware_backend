const jwt = require("jsonwebtoken");
const { isUserAdmin } = require("../services/admin.service");


const verifyToken = async (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers.authorization;

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, 'secret');

        req.user = await isUserAdmin(decoded.userid);
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;