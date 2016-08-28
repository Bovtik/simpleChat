const modalText = document.querySelector('#modal-text');
const modalBtn = document.querySelector('#modal-btn');
const connectModal = document.querySelector('#connect-modal');
const messageHolder = document.querySelector('#message-holder');
const messageText = document.querySelector('#message-input');
const messageBtn = document.querySelector('#message-btn');

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
	createMessage(data.nickname, data.text, data.id);
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
	socket.emit('sendMessage', {
		id: socket.id,
		text: userMessage
	});
};

function createMessage(name, text, id) {
	let message = document.createElement('div');
	message.className = "message-wrap";
	message.innerHTML = `
		<div class="message">
			<div class="message__nickname">${name}</div>
			<div class="message__text">${text}</div>
		</div>
	`;
	messageHolder.appendChild(message);
	if (socket.id == id) {
		message.className += " message-wrap--right";
		message.querySelector('.message__nickname').className += " message__nickname--right";
	};
	messageHolder.scrollTop = messageHolder.scrollHeight;
};

