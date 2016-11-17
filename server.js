// modules =================================================
var express        = require('express');
var exphbs  = require('express-handlebars');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
admin = require("firebase-admin");

// configuration ===========================================
    
// set our port
var port = process.env.PORT || 8080; 

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var serviceAccount = require("./firebase/raliuninorte-firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://raliuninorte.firebaseio.com"
});

// routes ==================================================
require('./app/routes')(app, admin); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;               