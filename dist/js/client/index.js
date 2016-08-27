'use strict';

var modalText = document.querySelector('#modal-text');
var modalBtn = document.querySelector('#modal-btn');
var connectModal = document.querySelector('#connect-modal');
var messageHolder = document.querySelector('#message-holder');
var messageText = document.querySelector('#message-input');
var messageBtn = document.querySelector('#message-btn');

modalBtn.addEventListener('click', function () {
	if (modalText.value != '') {
		var userName = modalText.value;
		modalText.value = '';
		connectModal.style.display = 'none';
		socket.emit('setNickname', {
			id: socket.id,
			nickname: userName
		});
	};
});

messageBtn.addEventListener('click', function () {
	if (messageText.value != '') {
		var userMessage = messageText.value;
		messageText.value = '';
		socket.emit('sendMessage', {
			id: socket.id,
			text: userMessage
		});
	};
});

socket.on('broadcastMessage', function (data) {
	createMessage(data.nickname, data.text, data.id);
});

function createMessage(name, text, id) {
	var message = document.createElement('div');
	socket.id == id ? message.className = "message-wrap message-wrap--right" : message.className = "message-wrap";
	message.innerHTML = '\n\t\t<div class="message">\n\t\t\t<div class="message__nickname">' + name + '</div>\n\t\t\t<div class="message__text">' + text + '</div>\n\t\t</div>\n\t';
	messageHolder.appendChild(message);
	messageHolder.scrollTop = messageHolder.scrollHeight;
};