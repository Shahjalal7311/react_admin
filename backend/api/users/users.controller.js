const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var Users = require('./users.doa');
var JWT_KEY = 'secretweb'

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    removeUser,
    apiAuthcheck,
    userLogin
};
function createUser (req, res, next) {
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

function getUsers(req, res, next) {
    Users.usersget({}, function(err, users) {
        if(err) {
            console.log(err.keyValue,'duplicate user');
        }
        res.json({
          users: users
        })
    })
}

function getUser(req, res, next) {
    Users.findById({"_id": req.params.id}, function(err, user) {
        if(err) {
            console.log(err.keyValue,'duplicate user');
        }
        res.json({
            user: user
        })
    })
}

function updateUser(req, res, next) {
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

function removeUser(req, res, next) {
  Users.delete({_id: req.params.id}, function(err, user) {
        if(err) {
            console.log(err.keyValue,'error');
        }
        res.json({
            message : "user deleted successfully"
        })
    })
}

 function apiAuthcheck(req) {
    Users.findOneuser({"email": req.email}, async function(err, user) {
        if(err) {
            console.log(err.keyValue,'error');
        }
        var userObj = {
            "_id":  user._id,
            "username": user.username,
            "email": user.email,
            "acess_token": user.acess_token,
        }
        return userObj;
    })
}

function userLogin(req, res, next) {
    Users.authCheck({email: req.body.username}, async function(err, user){
        if (!user) {
            return res.status(401).send({status: 401,err: 'Login failed! Check authentication credentials'})
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordMatch) {
            return res.status(401).send({status: 401, err: 'Invalid login credentials' })
        }
        var name = req.body.username;
        var email = req.body.email;
        var userObj = {
            "refres_token": jwt.sign({name,email},JWT_KEY),
            "user": user,
        }
        res.json({user:userObj})
    })
}