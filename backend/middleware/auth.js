const jwt = require('jsonwebtoken')
var JWT_KEY = 'secretweb';
const User = require('../api/users/users.controller');

const auth = async(req, res, next) => {
    const tokendata = req.header('Authorization');
    try{
        const token = tokendata.replace('Bearer ', '')
        if (!token) return res.status(401).send("Access denied. No token provided.");
        try {
            const decoded = jwt.verify(token, JWT_KEY)
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).send({ error: 'Invalid token.' })
        }
    } catch (error) {
        res.status(401).send({ error: 'Access denied. No token provided.' })
    }
}

module.exports = auth
