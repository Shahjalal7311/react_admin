var express = require('express');
var log = require('morgan')('dev');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

var properties = require('./backend/config/properties');
var db = require('./backend/config/db');
// routes
var usersRoutes = require('./backend/api/users/users.routes');
var articlasRoutes = require('./backend/api/artical/artical.routes');
var categoryRoutes = require('./backend/api/category/category.routes');
var app = express();

// Image upload

//configure bodyparser
var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({extended:true});

//initialise express router
var router = express.Router();
// call the database connectivity function
db();

// configure app.use()
app.use(log);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Error handling
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Credentials", "true");
     res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
     res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
   next();
 });

// use express router
app.use('/api',router);
//call routing
usersRoutes(router);
articlasRoutes(router);
categoryRoutes(router);

// intialise server
app.listen(properties.PORT, (req, res) => {
    console.log(`Server is running on ${properties.PORT} port.`);
})