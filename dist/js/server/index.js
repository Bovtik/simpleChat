'use strict';

var port = 8080;

var fs = require('fs');
var path = require('path');

var express = require('express');
var app = express();

app.use('/js', express.static(path.join(path.join(__dirname, '..'), 'client')));

['css', 'images', 'data'].forEach(function (item) {
	var tmpPath = '/' + item;
	app.use(tmpPath, express.static(path.join(path.join(path.join(__dirname, '..'), '..'), tmpPath)));
});

app.get('/', function (req, res) {
	var layout = fs.readFileSync('dist/index.html', 'utf8');
	res.send(layout);
});

var server = app.listen(port, function () {
	console.log('Listening on ' + port + ' port');
});

var io = require('socket.io').listen(server);

var userInfo = {};

io.on('connection', function (socket) {

	socket.on('setNickname', function (data) {
		userInfo[data.id] = data.nickname;
		console.log(data.nickname + ' connected');

		io.sockets.emit('userConnect', { nickname: data.nickname });
		sendNicknameList();
	});

	socket.on('sendMessage', function (data) {
		console.log(userInfo[data.id] + ': ' + data.text);

		data.nickname = userInfo[data.id];
		var date = new Date();
		data.time = date.getHours() + ':' + date.getMinutes();

		io.sockets.emit('broadcastMessage', data);
	});

	socket.on('disconnect', function () {
		var id = socket.id.substring(2);
		console.log('User ' + userInfo[id] + ' disconnected (id: ' + id + ')');
		delete userInfo[id];

		io.sockets.emit('userDisconnect', { nickname: userInfo[id] });
		sendNicknameList();
	});
});

function sendNicknameList() {
	var userList = [];

	for (var key in userInfo) {
		userList.push(userInfo[key]);
	}

	io.sockets.emit('broadcastNicknames', {
		nicknames: userList
	});
}