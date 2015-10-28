var express = require('express');
var cors = require('cors');
var app = express();
var port = 8000;

app.use(cors());
app.use(express.static(__dirname + '/dist'));
app.use('bower_components',  express.static(__dirname + '/bower_components'));
console.log('Listening to port 8000');
app.listen(process.env.PORT || port);
