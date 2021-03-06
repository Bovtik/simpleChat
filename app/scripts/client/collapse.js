initCollapse({
	body: '.users-box__list',
	btn: '.users-box__show-btn',
	duration: '450'
});

function initCollapse(settings) {
	var collapseArr = document.querySelectorAll('*[data-collapse="1"]'),
			collapseBtn = document.querySelector(settings.btn),
			collapseBody = document.querySelector(settings.body),
			collapseDuration = settings.duration || '300',
			collapseType = settings.type || 'ease';
			
			collapseDuration = (+collapseDuration / 1000) + 's';

	var collapseTrn = collapseDuration + ' ' + collapseType;

	for (let i = 0; i < collapseArr.length; i++) {
		collapseArr[i].style.height = '0';
	};

	collapseBtn.addEventListener('click', collapse);

	function collapse() {
		var temp_h;
		if (+collapseBody.getAttribute('data-collapse')) {
			collapseBody.style.height = 'auto';
			temp_h = collapseBody.offsetHeight + 'px';
			collapseBody.style.height = '0';
			setTimeout(function() {
				collapseBody.style.transition = collapseTrn;
				setTimeout(function() {
					collapseBody.style.height = temp_h;
				}, 20);
			}, 1);
			collapseBtn.innerHTML = 'hide';
			setTimeout(function() {
				collapseBody.setAttribute('data-collapse', '0');
				let temp_str = settings.btn + ' users-box__show-btn--hide';
				temp_str = temp_str.substring(1, temp_str.length);
				collapseBtn.className = temp_str;
			}, 450);
		} else {
			collapseBody.style.height = '0';
			collapseBtn.innerHTML = 'users-list';
			setTimeout(function() {
				collapseBody.style.transition = 'none';
				collapseBody.setAttribute('data-collapse', '1');
				let temp_str = settings.btn + ' users-box__show-btn--show';
				temp_str = temp_str.substring(1, temp_str.length);
				collapseBtn.className = temp_str;
			}, 450);
		};
	};
};