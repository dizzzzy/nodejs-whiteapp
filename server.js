if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'),
    bodyParser = require('body-parser'),
    config = require('./config/config');
require('./api/services/passport');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb', function(err,database){
//mongoose.connect(config.url, function(err, database) {
    if (err)
        console.log(err);
    const routes = require('./api/routes/todoListRoutes');
    routes(app);
    app.listen(port, function(){
        console.log('Hitch hikers RESTful API server started on: ' + port);
    });
});


