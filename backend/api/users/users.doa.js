var mongoose = require('mongoose');
var usersSchema = require('./users.model');
usersSchema.statics = {
    usercreate : function(data, cb) {
        var user = new this(data);
        user.save(cb);
    },

    usersget: function(query, cb) {
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
    },

    findOneuser: function(query, cb) {
        this.findOne(query, cb);
    },

    authCheck: function(query, cb) {
        this.findOne(query, cb);
    }
}

var usersModel = mongoose.model('Users', usersSchema);
module.exports = usersModel;