const jwt = require("jsonwebtoken");
const { isUserAdmin } = require("../services/admin.service");
const { getUserById } = require("../services/user.service");


const verifyToken = async (req, res, next) => {
    const reqToken =
        req.body.token || req.query.token || req.headers.authorization;

    if (!reqToken) {
        return res.status(403).send({ success: false, message: "A token is required for authentication" });
    }

    let token = reqToken.split(' ')[1]

    try {
        const decoded = jwt.verify(token, 'secret');
        const isAdmin = await isUserAdmin(decoded.userid)

        req.user = await getUserById(decoded.userid);
    } catch (err) {
        return res.status(401).send({ success: false, message: "Invalid Token" });
    }
    return next();
};

module.exports = verifyToken;