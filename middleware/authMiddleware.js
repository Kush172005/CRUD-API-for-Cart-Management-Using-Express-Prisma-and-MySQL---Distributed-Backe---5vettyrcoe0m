const API_AUTH_KEY = require("./authkey");

const authMiddleware = (req, res, next) => {
    const apiAuthKey = req.headers["apiauthkey"];

    if (!apiAuthKey) {
        return res.status(403).json({
            error: "apiauthkey is missing or invalid",
        });
    }

    if (apiAuthKey !== API_AUTH_KEY) {
        return res.status(403).json({
            error: "Failed to authenticate apiauthkey",
        });
    }

    next();
};

module.exports = { authMiddleware };
