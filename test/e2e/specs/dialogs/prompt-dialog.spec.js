const DialogPage = require('./pageobjects/dialog.page');

describe('PromptDialog', () => {
	let page;

	beforeAll(() => {
		page = new DialogPage(browser.desiredCapabilities.platformName);
	});

	beforeEach(() => {
		page.result.clearElement();
	});

	it('should return input text', () => {
		page.showDialog('prompt');
		browser.keys('Imperator Furiosa');
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
