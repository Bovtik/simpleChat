const modalText = document.querySelector('#modal-text');
const modalBtn = document.querySelector('#modal-btn');
const connectModal = document.querySelector('#connect-modal');
const messageHolder = document.querySelector('#message-holder');
const messageText = document.querySelector('#message-input');
const messageBtn = document.querySelector('#message-btn');
const usersList = document.querySelector('#users-list');

window.onload = () => {
	modalText.focus();
};

modalBtn.addEventListener('click', () => {
	if (modalText.value != '') {
		submitModal();
	};
});

modalText.addEventListener('keydown', (event) => {
	if (event.keyCode == 13) {
		submitModal();
	};
});

messageBtn.addEventListener('click', () => {
	if (messageText.value != '') {
		sendMessage();
	};
});

messageText.addEventListener('keydown', (event) => {
	if (event.keyCode == 13) {
		sendMessage();
	};
});

socket.on('broadcastMessage', (data) => {
	createMessage(data.nickname, data.text, data.time, data.id);
});

socket.on('broadcastNicknames', (data) => {
	setUsersList(data.nicknames);
});

function submitModal() {
	const userName = modalText.value;
	modalText.value = '';
	connectModal.style.display = 'none';
	socket.emit('setNickname', {
		id: socket.id,
		nickname: userName
	});
	messageText.focus();
};

function sendMessage() {
	let userMessage = messageText.value;
	messageText.value = '';
	let date = new Date();
	socket.emit('sendMessage', {
		id: socket.id,
		text: userMessage,
		time: date.getHours() + ':' + date.getMinutes()
	});
};

function createMessage(name, text, time, id) {
	let message = document.createElement('div');
	message.className = "message-wrap";
	message.innerHTML = `
		<div class="message">
			<div class="message__nickname">${name}</div>
			<span class="message__text">${text}</span>
			<span class="message__time">${time}</span>
		</div>
	`;
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
	arr.forEach((item, i, arr) => {
		let listItem = document.createElement('li');
		listItem.innerHTML = item;
		usersList.appendChild(listItem);
	});
};

