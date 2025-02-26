const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
    const token = req.cookies.token; // Get token from cookies

    if (!token) {
        return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY); // Verify token
        req.teamCode = decoded.teamCode; // Attach teamCode to request object
        next(); // Move to next middleware or route
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token. Please log in again." });
    }
};

module.exports = isLoggedIn;
