const port = 8080;

const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();



app.use('/js',
  express.static(
    path.join(
      	path.join(__dirname, '..'), 'client')));

['css', 'images', 'data'].forEach( (item) => {
	let tmpPath = '/' + item;
	app.use(tmpPath, 
	  express.static(
	    path.join(
	    	path.join(
	      	path.join(__dirname, '..'), '..'), tmpPath)));
});

app.get('/', (req, res) => {
	let layout = fs.readFileSync('dist/index.html', 'utf8');
	res.send(layout)
});



const server = app.listen(port, () => {
	console.log(`Listening on ${port} port`);
});



const io = require('socket.io').listen(server);

let userInfo = {};

io.on('connection', (socket) => {

	socket.on('setNickname', (data) => {
		userInfo[data.id] = data.nickname;
		console.log(`${data.nickname} connected`);

		socket.emit('userConnect', {nickname: userInfo[id]});
		sendNicknameList();
	});

	socket.on('sendMessage', (data) => {
		console.log(`${userInfo[data.id]}: ${data.text}`);

		data.nickname = userInfo[data.id];
		let date = new Date();
		data.time = date.getHours() + ':' + date.getMinutes();

		io.sockets.emit('broadcastMessage', data);
	})

	socket.on('disconnect', () => {
		let id = socket.id.substring(2);
		console.log(`User ${userInfo[id]} disconnected (id: ${id})`);
		delete userInfo[id];

		socket.emit('userDisconnect', {nickname: userInfo[id]});
		sendNicknameList();
	})
});

function sendNicknameList () {
	let userList = [];

	for (let key in userInfo) {
		userList.push(userInfo[key]);
	}

	io.sockets.emit('broadcastNicknames', {
		nicknames: userList
	});
}