const jwt = require('jsonwebtoken');
var BCRYPT_SALT_ROUNDS = 12;
var JWT_KEY = 'secretweb'
var Users = require('./login.doa');

exports.authLogin = function(req, res, next) {
  console.log(req.body.email);
  Users.getByid({"email": req.body.email}, function(err, user) {
      if(err) {
          console.log(err.keyValue,'duplicate user');
      }
      console.log(user,'user');
  })
}