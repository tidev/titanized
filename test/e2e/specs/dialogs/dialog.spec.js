const DialogPage = require('./pageobjects/dialog.page');

describe('Dialog', () => {
	let page;

	beforeAll(() => {
		page = new DialogPage(browser.capabilities.platformName);
	});

	describe('Alert Dialog', () => {
		it('should show and accept alert dialog', () => {
			page.showDialog('alert');
			page.okButton.click();
			browser.pause(1000);
			expect(page.result.getText()).toEqual('alert_closed');
		});
	});

	describe('Confirm Dialog', () => {
		it('should show and accept confirm dialog', () => {
			page.showDialog('confirm');
			page.okButton.click();
			browser.pause(1000);
			expect(page.result.getText()).toEqual('0');
		});

		it('should show and decline confirm dialog', () => {
			page.showDialog('confirm');
			page.cancelButton.click();
			browser.pause(1000);
			expect(page.result.getText()).toEqual('2');
		});
	});

	describe('Prompt Dialog', () => {
		it('should return input text', () => {
			page.showDialog('prompt');
			page.setPromptInput('Imperator Furiosa');
			page.okButton.click();
			browser.pause(1000);
			expect(page.result.getText()).toEqual('{"confirm":0,"value":"Imperator Furiosa"}');
		});

		it('should return empty value on cancel', () => {
			page.showDialog('prompt');
			page.cancelButton.click();
			browser.pause(1000);
			expect(page.result.getText()).toEqual('{"confirm":2,"value":""}');
		});
	});
});
