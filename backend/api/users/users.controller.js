const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var Users = require('./users.doa');
var BCRYPT_SALT_ROUNDS = 12;
var JWT_KEY = 'secretweb'

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    removeUser,
    userLogin
};
async function createUser (req, res, next) {
    var name = req.body.username;
    var email = req.body.email;
    var user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      acess_token: jwt.sign({name,email},JWT_KEY),
    };
    Users.usercreate(user, function(err, user) {
        if(err) {
            console.log(err.keyValue,'duplicate user');
        }
        res.json({
            message : "User created successfully"
        })
    })
}

async function getUsers(req, res, next) {
    Users.usersget({}, function(err, users) {
        if(err) {
            console.log(err.keyValue,'duplicate user');
        }
        res.json({
          users: users
        })
    })
}

async function getUser(req, res, next) {
    Users.findById({"_id": req.params.id}, function(err, user) {
        if(err) {
            console.log(err.keyValue,'duplicate user');
        }
        res.json({
            user: user
        })
    })
}

async function updateUser(req, res, next) {
    var name = req.body.username;
    var email = req.body.email;
    var user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      acess_token: jwt.sign({name,email},JWT_KEY),
    }
    Users.update({_id: req.params.id}, user, function(err, user) {
        if(err) {
            console.log(err.keyValue,'duplicate user');
        }
        res.json({
            message : "User updated successfully"
        })
    })
}

async function removeUser(req, res, next) {
  Users.delete({_id: req.params.id}, function(err, user) {
        if(err) {
            console.log(err.keyValue,'error');
        }
        res.json({
            message : "user deleted successfully"
        })
    })
}

function userLogin(req, res, next) {
    Users.authCheck({email: req.body.email}, async function(err, user){
        if (!user) {
            return res.status(401).send({status: 401,err: 'Login failed! Check authentication credentials'})
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordMatch) {
            return res.status(401).send({status: 401, err: 'Invalid login credentials' })
        }
        res.json({user: user})
    })
}