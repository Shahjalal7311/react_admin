var mongoose = require('mongoose');
var Users = require('./seeders/users.seeder');

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/react_admin';

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
export seedersList = {
  Users
};

/**
 * Connect to mongodb implementation
 * @return {Promise} 
 */
  // mongoose.connect(mongoURL);
export connect = async () => await mongoose.connect(mongoURL, { useNewUrlParser: true });

