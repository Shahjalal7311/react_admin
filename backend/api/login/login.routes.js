var Login = require('./login.controller');

module.exports = function(router) {
    router.post('/login', Login.authLogin);
}