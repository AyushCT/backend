
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

const verifyAuthToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.userId = decodedToken.userId; // Attach userId to request object
        next();
    });
};

module.exports = { verifyAuthToken };
