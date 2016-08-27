'use strict';

var port = 8080;

var fs = require('fs');
var path = require('path');

var express = require('express');
var app = express();

var io = require('socket.io')(8081);

app.use('/js', express.static(path.join(path.join(__dirname, '..'), 'client')));

['css', 'images', 'data'].forEach(function (item) {
	var tmpPath = '/' + item;
	app.use(tmpPath, express.static(path.join(path.join(path.join(__dirname, '..'), '..'), tmpPath)));
});

app.get('/', function (req, res) {
	var layout = fs.readFileSync('dist/index.html', 'utf8');
	res.send(layout);
});

var userInfo = {};

io.on('connection', function (socket) {

	socket.on('setNickname', function (data) {
		userInfo[data.id] = data.nickname;
	});

	socket.on('sendMessage', function (data) {
		console.log(userInfo[data.id] + ': ' + data.text);
		socket.emit('broadcastMessage', {
			id: data.id,
			nickname: userInfo[data.id],
			text: data.text
		});
	});

	socket.on('disconnect', function () {
		console.log('User with id ' + socket.id + ' disconnected');
	});
});

app.listen(port, function () {
	console.log('Listening on ' + port + ' port');
});