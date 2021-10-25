
const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.profileDataService = async (req, res, next) => {
    let token = req.headers.authorization;
    if (!token)
        return res.json({ message: "Token is missing!" })

    const decoded = await jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
}