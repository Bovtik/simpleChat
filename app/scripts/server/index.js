const port = 8080;

const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

const io = require('socket.io')(8081);



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

let userInfo = {};

io.on('connection', (socket) => {

	socket.on('setNickname', (data) => {
		userInfo[data.id] = data.nickname;
	});

	socket.on('disconnect', () => {
		console.log(`User with id $(socket.id) disconnected`);
	})
});



app.listen(port, () => {
	console.log(`Listening on ${port} port`);
});

