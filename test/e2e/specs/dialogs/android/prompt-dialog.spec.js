const page = require('./dialog.page');

Object.defineProperty(page, 'promptInput', {
	get: () => {
		const input = $('android=new UiSelector().resourceId("com.titanized.test.e2e:id/titanium_ui_edittext")');
		input.waitForExist(5000);
		return input;
	}
});

describe('PromptDialog', () => {
	beforeEach(() => {
		page.result.clearElement();
	});

	it('should return input text', () => {
		expect(page.result.getText()).toEqual('');

		page.showDialog('prompt');
		page.promptInput.setValue('Imperator Furiosa');
		page.okButton.click();

		expect(page.result.getText()).toEqual('{"confirm":0,"value":"Imperator Furiosa"}');
	});

	it('should return empty value on cancel', () => {
		expect(page.result.getText()).toEqual('');

		page.showDialog('prompt');
		page.cancelButton.click();

		expect(page.result.getText()).toEqual('{"confirm":2,"value":""}');
	});
});
