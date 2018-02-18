var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var events = require('./routes/events');

var port = 3000;

var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

console.log("Dir Name" + __dirname);

//Set Static Folder
app.use(express.static(path.join(__dirname, 'dist')));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', events);

app.listen(port, function(){
    console.log('Server started on port ' + port);
});