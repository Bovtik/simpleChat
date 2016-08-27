const modalText = document.querySelector('#modal-text');
const modalBtn = document.querySelector('#modal-btn');
const connectModal = document.querySelector('#connect-modal');
const messageHolder = document.querySelector('#message-holder');
const messageText = document.querySelector('#message-input');
const messageBtn = document.querySelector('#message-btn');

modalBtn.addEventListener('click', () => {
	if (modalText.value != '') {
		const userName = modalText.value;
		modalText.value = '';
		connectModal.style.display = 'none';
		socket.emit('setNickname', {
			id: socket.id,
			nickname: userName
		});
	};
});

messageBtn.addEventListener('click', () => {
	if (messageText.value != '') {
		let userMessage = messageText.value;
		messageText.value = '';
		socket.emit('sendMessage', {
			id: socket.id,
			text: userMessage
		});
	};
});

socket.on('broadcastMessage', (data) => {
	createMessage(data.nickname, data.text);
});

function createMessage(name, text) {
	let message = document.createElement('div');
	message.className = "message-wrap";
	message.innerHTML = `
		<div class="message">
			<div class="message__nickname">${name}</div>
			<div class="message__text">${text}</div>
		</div>
	`;
	messageHolder.appendChild(message);
	messageHolder.scrollTop = messageHolder.scrollHeight;
};

