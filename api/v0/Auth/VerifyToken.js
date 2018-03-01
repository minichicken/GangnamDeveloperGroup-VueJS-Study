const jwt = require('jsonwebtoken');
const config = require('../../../config');

module.exports = {
    verifyToken: (req, res, next) => {
        var token = req.headers['x-access-token'];
        if (!token) {
            return res.status(403).json({ auth: false, message: 'no token' });
        }
        jwt.verify(token, config.jwtSecret, (err, decode) => {
            if (err) { return res.status(500).json({ auth: false, message: 'fail token' }) }
            req.userId = decode.id;
            next();
        });
    }
}