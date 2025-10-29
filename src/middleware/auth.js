const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const User = require('../models/User');

async function getUserFromToken(token) {
    try {
        if (!token) return null;
        const decoded = jwt.verify(token.replace('Bearer ', ''), jwtSecret);
        const user = await User.findById(decoded.sub).lean();
        return user || null;
    } catch (err) {
        return null;
    }
}

module.exports = { getUserFromToken };
