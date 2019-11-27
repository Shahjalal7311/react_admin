var Users = require('./users.controller');

module.exports = function(router) {
    router.post('/usercreate', Users.createUser);
    router.get('/usersget', Users.getUsers);
    router.get('/userget/:id', Users.getUser);
    router.put('/userupdate/:id', Users.updateUser);
    router.delete('/userremove/:id', Users.removeUser);
}