const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY); // Ensure JWT_SECRET is set in .env

        req.teamCode = decoded.teamCode; // Attach teamCode to req
        next();
    } catch (error) {
        return res.status(403).json({ message: "Unauthorized: Invalid token" });
    }
};

module.exports = isLoggedIn;
