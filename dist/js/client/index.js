'use strict';

var modalText = document.querySelector('#modal-text');
var modalBtn = document.querySelector('#modal-btn');
var connectModal = document.querySelector('#connect-modal');
var messageHolder = document.querySelector('#message-holder');
var messageText = document.querySelector('#message-input');
var messageBtn = document.querySelector('#message-btn');
var usersList = document.querySelector('#users-list');

window.onload = function () {
	modalText.focus();
};

modalBtn.addEventListener('click', function () {
	if (modalText.value != '') {
		submitModal();
	};
});

modalText.addEventListener('keydown', function (event) {
	if (event.keyCode == 13) {
		submitModal();
	};
});

messageBtn.addEventListener('click', function () {
	if (messageText.value != '') {
		sendMessage();
	};
});

messageText.addEventListener('keydown', function (event) {
	if (event.keyCode == 13) {
		sendMessage();
	};
});

socket.on('broadcastMessage', function (data) {
	createMessage(data.nickname, data.text, data.time, data.id);
});

socket.on('broadcastNicknames', function (data) {
	setUsersList(data.nicknames);
});

socket.on('userConnect', function (data) {
	createUserConnect(data.nickname);
});

socket.on('userDisonnect', function (data) {
	createUserDisconnect(data.nickname);
});

function submitModal() {
	var userName = modalText.value;
	modalText.value = '';
	connectModal.style.display = 'none';
	socket.emit('setNickname', {
		id: socket.id,
		nickname: userName
	});
	messageText.focus();
};

function sendMessage() {
	var userMessage = messageText.value;
	messageText.value = '';
	var date = new Date();
	socket.emit('sendMessage', {
		id: socket.id,
		text: userMessage
	});
};

function createMessage(name, text, time, id) {
	var message = document.createElement('div');
	message.className = "message-wrap";
	message.innerHTML = '\n\t\t<div class="message">\n\t\t\t<div class="message__nickname">' + name + '</div>\n\t\t\t<span class="message__text">' + text + '</span>\n\t\t\t<span class="message__time">' + time + '</span>\n\t\t</div>\n\t';
	messageHolder.appendChild(message);
	if (socket.id == id) {
		message.className += " message-wrap--right";
		message.querySelector('.message__nickname').className += " message__nickname--right";
	};
	messageHolder.scrollTop = messageHolder.scrollHeight;
};

function createUserConnect(name) {
	var message = document.createElement('span');
	message.className = "message-wrap message-wrap--center";
	message.innerHTML = '\n\t\t<span class="message-wrap__connect">' + name + ' connected</span>\n\t';
	messageHolder.appendChild(message);
};

function createUserDisconnect(name) {
	var message = document.createElement('span');
	message.className = "message-wrap message-wrap--center";
	message.innerHTML = '\n\t\t<span class="message-wrap__connect">' + name + ' disconnected</span>\n\t';
	messageHolder.appendChild(message);
};

function setUsersList(arr) {
	arr.sort();
	usersList.innerHTML = '';
	arr.forEach(function (item, i, arr) {
		var listItem = document.createElement('li');
		listItem.innerHTML = item;
		usersList.appendChild(listItem);
	});
};