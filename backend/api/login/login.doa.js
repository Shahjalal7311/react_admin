var mongoose = require('mongoose');
var loginSchema = require('../users/users.model');
loginSchema.statics = {
    getByid: function(query, cb) {
        this.findOne(query, cb);
    }
}

var loginModel = mongoose.model('Users', loginSchema);
module.exports = loginModel;