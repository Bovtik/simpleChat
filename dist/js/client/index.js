'use strict';

var modalText = document.querySelector('#modal-text');
var modalBtn = document.querySelector('#modal-btn');
var connectModal = document.querySelector('#connect-modal');
var messageHolder = document.querySelector('#message-holder');
var messageText = document.querySelector('#message-input');
var messageBtn = document.querySelector('#message-btn');

modalBtn.addEventListener('click', function () {
	if (modalText.value != '') {
		var user_name = modalText.value;
		modalText.value = '';
		connectModal.style.display = 'none';
		socket.emit('setNickname', {
			id: socket.id,
			nickname: user_name
		});
	};
});