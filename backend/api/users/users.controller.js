const jwt = require('jsonwebtoken');
var Users = require('./users.doa');
var BCRYPT_SALT_ROUNDS = 12;
var JWT_KEY = 'secretweb'

exports.createUser = function (req, res, next) {
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

exports.getUsers = function(req, res, next) {
    Users.usersget({}, function(err, users) {
        if(err) {
            console.log(err.keyValue,'duplicate user');
        }
        res.json({
          users: users
        })
    })
}

exports.getUser = function(req, res, next) {
    Users.findById({"_id": req.params.id}, function(err, user) {
        if(err) {
            console.log(err.keyValue,'duplicate user');
        }
        res.json({
            user: user
        })
    })
}

exports.updateUser = function(req, res, next) {
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

exports.removeUser = function(req, res, next) {
  Users.delete({_id: req.params.id}, function(err, user) {
        if(err) {
            console.log(err.keyValue,'error');
        }
        res.json({
            message : "user deleted successfully"
        })
    })
}