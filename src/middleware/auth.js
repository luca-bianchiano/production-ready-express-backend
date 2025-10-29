const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { jwtSecret } = require("../config");

async function getUserFromToken(token) {
    if (!token) return null;
    try {
        // Remove 'Bearer ' prefix if present
        const cleanToken = token.replace(/^Bearer\s+/i, '');
        const decoded = jwt.verify(cleanToken, jwtSecret);
        const user = await User.findById(decoded.id);
        return user || null;
    } catch (err) {
        return null;
    }
}

// Express middleware to protect REST routes
async function requireAuth(req, res, next) {
    try {
        const authHeader = req.headers.authorization || "";
        if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

        const token = authHeader.replace(/^Bearer\s+/i, "");
        const decoded = jwt.verify(token, jwtSecret);

        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ message: "User not found" });

        req.user = user; // attach full user object
        next();
    } catch (err) {
        console.error("Auth error:", err.message);
        res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = {
    getUserFromToken,
    requireAuth
};
