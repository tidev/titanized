const DialogPage = require('./pageobjects/dialog.page');

describe('AlertDialog', () => {
	let page;

	beforeAll(() => {
		page = new DialogPage(browser.desiredCapabilities.platformName);
	});

	it('should show and accept alert dialog', () => {
		page.showDialog('alert');
		page.okButton.click();
		browser.pause(1000);
		expect(page.result.getText()).toEqual('alert_closed');
	});
});
