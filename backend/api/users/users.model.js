var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const validator = require('validator')
const jwt = require('jsonwebtoken')
var SALT_WORK_FACTOR = 10;
var JWT_KEY = 'WinterIsComingGOT2019';

var Schema = mongoose.Schema;

var usersSchema = new Schema({
        username: {
            type: String, 
            lowercase: true, 
            unique: true, 
            required: [true, "can't be blank"], 
            match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true
        },
        email: {
            type: String, 
            lowercase: true, 
            unique: true, 
            required: [true, "can't be blank"], 
            match: [/\S+@\S+\.\S+/, 'is invalid'], 
            index: true
        },
        password :{
            type: String,
            required: true,
            minLength: 7
        },
        acess_token:{
            type: String,
            required: false
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

usersSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

usersSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

module.exports = usersSchema;