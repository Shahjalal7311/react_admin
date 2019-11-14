var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var Schema = mongoose.Schema;

var usersSchema = new Schema({
        username :{
            type: String,
            unique : false,
            required : true
        },
        email : {
            type: String,
            unique : false,
            required : true
        },
        password :{
            type: String,
            unique : false,
            required : true
        }
    }, 
    {
        timestamps: true
    }
);

usersSchema.pre('save', function(next){
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});

module.exports = usersSchema;