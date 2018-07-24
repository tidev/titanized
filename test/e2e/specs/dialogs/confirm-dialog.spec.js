const DialogPage = require('./pageobjects/dialog.page');

describe('ConfirmDialog', () => {
	let page;

	beforeAll(() => {
		page = new DialogPage(browser.desiredCapabilities.platformName);
	});

	beforeEach(() => {
		page.result.clearElement();
	});

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
