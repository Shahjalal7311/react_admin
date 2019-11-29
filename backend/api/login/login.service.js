const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var User = require('../users/users.model');

module.exports = {
    authenticate,
};

async function authenticate({ email, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
        const { password, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, 10);
        return {
            ...userWithoutHash,
            token
        };
    }
}