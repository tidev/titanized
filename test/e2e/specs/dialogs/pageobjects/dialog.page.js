const selectors = {
	android: {
		okButton: 'android=new UiSelector().text("OK").className("android.widget.Button")',
		cancelButton: 'android=new UiSelector().text("CANCEL").className("android.widget.Button")',
		result: '//TextInputLayout[@content-desc="result."]/android.widget.FrameLayout/android.widget.EditText',
		promptInput: 'android=new UiSelector().className("android.widget.EditText")'
	},
	ios: {
		okButton: '~Ok',
		cancelButton: '~Cancel',
		result: '~result',
		promptInput: '-ios predicate string:type == \'XCUIElementTypeTextField\''
	}
};

class DialogPage {
	constructor(platformName) {
		this.platformName = platformName.toLowerCase();
		this.selectors = selectors[this.platformName];
	}

	get okButton() {
		const button = $(this.selectors.okButton);
		button.waitForExist(5000);
		return button;
	}

	get cancelButton() {
		const button = $(this.selectors.cancelButton);
		button.waitForExist(5000);
		return button;
	}

	get result() {
		const textArea = $(this.selectors.result);
		textArea.waitForExist(5000);
		return textArea;
	}

	showDialog(name) {
		const selector = `~show_${name}_button${this.platformName === 'android' ? '.' : ''}`;
		$(selector).click();
		browser.pause(2000);
	}

	setPromptInput(text) {
		const input = $(this.selectors.promptInput);
		input.waitForExist(2000);
		input.setValue(text);
		browser.pause(2000);
	}
}

module.exports = DialogPage;
