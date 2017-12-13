if (process.env.NODE_ENV !== 'production' || process.env.TESTING ==='true') { //to test before pushing to production
    require('dotenv').load();
}

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
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
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
const routes = require('./api/routes/routes');
routes(app); //express routes take 1rst priority
const port = process.env.PORT || 5000;



if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build')); //react routes take 2nd prio
    const path = require('path');
    app.get('*',(req, res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); //unknown route get index to resolve path
    });
}
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/Tododb', function(err,database){
mongoose.connect(process.env.DB_URL, function(err, database) {
    if (err)
        console.log(err);
    app.listen(port, function(){
        console.log('Hitch hikers RESTful API server started on: ' + port);
    });
});


/*,
    "postinstall": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"*/