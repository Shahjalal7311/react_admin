var mongoose = require('mongoose');
var articlasSchema = require('./artical.model');
articlasSchema.statics = {
    articalcreate : function(data, cb) {
        var articla = new this(data);
        articla.save(cb);
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

var articlasModel = mongoose.model('Articlas', articlasSchema);
module.exports = articlasModel;