const modalText = document.querySelector('#modal-text');
const modalBtn = document.querySelector('#modal-btn');
const connectModal = document.querySelector('#connect-modal');
const messageHolder = document.querySelector('#message-holder');
const messageText = document.querySelector('#message-input');
const messageBtn = document.querySelector('#message-btn');

modalBtn.addEventListener('click', () => {
	if (modalText.value != '') {
		let user_name = modalText.value;
		modalText.value = '';
		connectModal.style.display = 'none';
		socket.emit('setNickname', {
			id: socket.id,
			nickname: user_name
		});
	};
});