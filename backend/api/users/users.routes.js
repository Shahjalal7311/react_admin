var Users = require('./users.controller');

module.exports = function(router) {
    router.post('/usercreate', Users.createUser);
    router.get('/usersget', Users.getUsers);
    router.get('/get/:id', Users.getUser);
    router.put('/update/:id', Users.updateUser);
    router.delete('/remove/:id', Users.removeUser);
}