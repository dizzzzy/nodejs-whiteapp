if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
    console.log('hello');
    console.log(process.env.DB_URL);
}
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'),
    bodyParser = require('body-parser'),
    config = require('./config/config');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/Tododb');
mongoose.connect(config.url, function(err, database) {
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

