const jwt = require('jsonwebtoken'); //for authentication

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; //get token from header

    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET); //verify token
        req.user = verified; //set user
        next(); //continue to next middleware
    } catch (err) {
        res.status(400).json({ error: 'Token is not valid.' });
    }
};