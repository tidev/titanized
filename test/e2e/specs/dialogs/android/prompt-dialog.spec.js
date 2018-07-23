const page = Object.create({}, {
	okButton: {
		get: () => $('android=new UiSelector().text("OK").className("android.widget.Button")')
	},
	cancelButton: {
		get: () => $('android=new UiSelector().text("CANCEL").className("android.widget.Button")')
	},
	promptInput: {
		get: () => $('android=new UiSelector().resourceId("com.appc.global.classic:id/titanium_ui_edittext")')
	},
	showPrompt: {
		value: () => {
			$('~show_prompt_button.').click();
		}
	},
	result: {
		get: () => $('//TextInputLayout[@content-desc="result."]/android.widget.FrameLayout/android.widget.EditText')
	}
});

describe('PromptDialog', () => {
	beforeEach(() => {
		page.result.clearElement();
	});

	it('should return input text', () => {
		expect(page.result.getText()).toEqual('');

		page.showPrompt();
		page.promptInput.setValue('Imperator Furiosa');
		page.okButton.click();

		expect(page.result.getText()).toEqual('{"confirm":0,"value":"Imperator Furiosa"}');
	});

	it('should return empty value on cancel', () => {
		expect(page.result.getText()).toEqual('');

		page.showPrompt();
		page.cancelButton.click();

		expect(page.result.getText()).toEqual('{"confirm":2,"value":""}');
	});
});
