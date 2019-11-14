var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var usersSchema = require('./users.model');
var BCRYPT_SALT_ROUNDS = 12;
usersSchema.statics = {
    create : function(data, cb) {
        var user = new this(data);
        user.save(cb);
    },

    get: function(query, cb) {
        this.find(query, cb);
    },

    getByName: function(query, cb) {
        this.find(query, cb);
    },

    update: function(query, updateData, cb) {
        this.findOneAndUpdate(query, {$set: updateData},{new: true}, cb);
    },

    delete: function(query, cb) {
        this.findOneAndDelete(query,cb);
    }
}

var usersModel = mongoose.model('Users', usersSchema);
module.exports = usersModel;