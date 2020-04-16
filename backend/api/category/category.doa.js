var mongoose = require('mongoose');
var categorySchema = require('./category.model');
categorySchema.statics = {
    categorycreate : function(data, cb) {
			var category = new this(data);
			category.save(cb);
    },

    get: function(query,limit, cb) {
			per_page = 8
			if(limit == 'undefined'){
				page_no = 1
			}else{
				page_no = limit 
			}
			var pagination = {
				limit: per_page ,
				skip:per_page * (page_no - 1)
			}
			this.find(query, cb).limit(pagination.limit).skip(pagination.skip);
    },

    getcount: function(query, cb){
      this.find(query, cb);
    },

    getByid: function(query, cb) {
      this.findOne(query, cb);
    },

    update: function(query, updateData, cb) {
      this.findOneAndUpdate(query, {$set: updateData},{new: true}, cb);
    },

    delete: function(query, cb) {
      this.findOneAndDelete(query,cb);
    }
}

var categorysModel = mongoose.model('Categorys', categorySchema);
module.exports = categorysModel;