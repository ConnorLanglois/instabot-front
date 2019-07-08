function onChange() {
	const type = document.getElementById('type').selectedOptions[0].value;
	const input = document.getElementById('input');
	const submit = document.getElementById('submit');

	if (type === 'like') {
		input.placeholder = 'Id';
		submit.innerText = 'Get Free Likes!';
	} else if (type === 'follow') {
		input.placeholder = 'Username';
		submit.innerText = 'Get Free Follows!';
	}
}
