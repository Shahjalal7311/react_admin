var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articlasSchema = new Schema({
        title :{
            type: String,
            unique : false,
            required : true
        },
        slug : {
            type: String,
            unique : false,
            required : true
        },
        description :{
            type: String,
            unique : false,
            required : false
        },
        metaTitle :{
            type: String,
            unique : false,
            required : false
        },
        metaKeyword :{
            type: String,
            unique : false,
            required : false
        },
        metaDescription :{
            type: String,
            unique : false,
            required : false
        },
        order :{
            type: String,
            unique : false,
            required : false
        }
    }, 
    {
        timestamps: true
    }
);


module.exports = articlasSchema;