'use strict';

var port = 8080;
var app = require('express')();

app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.listen(port, function () {
	console.log('Listening on ' + port + ' port');
});