const auth = require("../../middleware/auth");
var Users = require('./users.controller');

module.exports = function(router) {
    router.post('/usercreate', auth, Users.createUser);
    router.get('/usersget', auth, Users.getUsers);
    router.get('/userget/:id', auth, Users.getUser);
    router.put('/userupdate/:id', auth, Users.updateUser);
    router.delete('/userremove/:id', auth, Users.removeUser);
    router.post('/userlogin/', Users.userLogin);
}