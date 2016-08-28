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

		let userList = [];
		
		for (let key in userInfo) {
			userList.push(userInfo[key]);
		}

		io.sockets.emit('broadcastNicknames', {
			nicknames: userList
		});
	});

	socket.on('sendMessage', (data) => {
		console.log(`${userInfo[data.id]}: ${data.text}`);

		io.sockets.emit('broadcastMessage', {
			id: data.id,
			nickname: userInfo[data.id],
			text: data.text
		});
	})

	socket.on('disconnect', () => {
		console.log(`User with id ${socket.id} disconnected`);
	})
});