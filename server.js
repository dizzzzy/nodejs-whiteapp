if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./api/models/model');
require('./api/services/passport');

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //1 month in ms
        keys: [process.env.COOKIE_KEY]
    })
);
app.use(passport.initialize());
app.use(passport.session());
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/Tododb', function(err,database){
mongoose.connect(config.url, function(err, database) {
    if (err)
        console.log(err);
    const routes = require('./api/routes/routes');
    routes(app);
    app.listen(port, function(){
        console.log('Hitch hikers RESTful API server started on: ' + port);
    });
});


