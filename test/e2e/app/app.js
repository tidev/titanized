const {
	AlertDialog,
	ConfirmDialog,
	PromptDialog
} = require('titanized');

const win = Ti.UI.createWindow();

const resultText = Ti.UI.createTextArea({
	bottom: 20,
	left: 20,
	right: 20,
	height: 50,
	accessibilityLabel: 'result'
});
win.add(resultText);

let button = Ti.UI.createButton({
	top: 20,
	title: 'Alert',
	accessibilityLabel: 'show_alert_button'
});
button.addEventListener('click', () => {
	const dialog = new AlertDialog({
		title: 'Foo',
		message: 'bar'
	});
	dialog.show().then(() => {
		resultText.value = 'alert_closed';
	});
});
win.add(button);

button = Ti.UI.createButton({
	top: 60,
	title: 'Confirm',
	accessibilityLabel: 'show_confirm_button'
});
button.addEventListener('click', () => {
	const dialog = new ConfirmDialog({
		title: 'Are you sure?',
		message: 'This will delete your entire data!'
	});
	dialog.show().then(result => {
		resultText.value = result
	});
});
win.add(button);

button = Ti.UI.createButton({
	top: 100,
	title: 'Prompt',
	accessibilityLabel: 'show_prompt_button'
});
button.addEventListener('click', () => {
	const dialog = new PromptDialog({
		title: 'What\'s your name?',
		message: 'Please enter your name'
	});
	dialog.show().then(result => {
		resultText.value = JSON.stringify(result);
	});
});
win.add(button);

win.open();