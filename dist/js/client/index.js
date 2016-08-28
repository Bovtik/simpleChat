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
	createMessage(data.nickname, data.text, data.id);
});

socket.on('broadcastNicknames', function (data) {
	setUsersList(data.nicknames);
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
	socket.emit('sendMessage', {
		id: socket.id,
		text: userMessage
	});
};

function createMessage(name, text, id) {
	var message = document.createElement('div');
	message.className = "message-wrap";
	message.innerHTML = '\n\t\t<div class="message">\n\t\t\t<div class="message__nickname">' + name + '</div>\n\t\t\t<div class="message__text">' + text + '</div>\n\t\t</div>\n\t';
	messageHolder.appendChild(message);
	if (socket.id == id) {
		message.className += " message-wrap--right";
		message.querySelector('.message__nickname').className += " message__nickname--right";
	};
	messageHolder.scrollTop = messageHolder.scrollHeight;
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