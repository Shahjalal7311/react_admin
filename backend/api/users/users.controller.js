var Users = require('./users.doa');
var BCRYPT_SALT_ROUNDS = 12;

exports.createUser = function (req, res, next) {
    var user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };
    
    Users.create(user, function(err, user) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "User created successfully"
        })
    })
}

exports.getUsers = function(req, res, next) {
    Users.get({}, function(err, users) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
          users: users
        })
    })
}

exports.getUser = function(req, res, next) {
  Users.get({username: req.params.username}, function(err, users) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
          users: users
        })
    })
}

exports.updateUser = function(req, res, next) {
    var user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
    Users.update({_id: req.params.id}, user, function(err, user) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "user updated successfully"
        })
    })
}

exports.removeUser = function(req, res, next) {
  Users.delete({_id: req.params.id}, function(err, user) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "user deleted successfully"
        })
    })
}