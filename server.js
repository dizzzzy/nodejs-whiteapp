var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'),
    bodyParser = require('body-parser'),
    db = require('./config/db');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/Tododb');
mongoose.connect(db.url, function(err, database) {
    if (err)
        console.log(err);
    var routes = require('./api/routes/todoListRoutes');
    routes(app);
    app.listen(port, function(){
        console.log('todo list RESTful API server started on: ' + port);
    });
});


// var routes = require('./api/routes/todoListRoutes');
// routes(app);
//
// app.listen(port);

