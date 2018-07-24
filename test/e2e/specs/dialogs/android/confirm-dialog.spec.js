const page = require('./dialog.page');

describe('ConfirmDialog', () => {
	beforeEach(() => {
		page.result.clearElement();
	});

	it('should show and accept confirm dialog', () => {
		expect(page.result.getText()).toEqual('');

		page.showDialog('confirm');
		page.okButton.click();

		expect(page.result.getText()).toEqual('0');
	});

	it('should show and decline confirm dialog', () => {
		expect(page.result.getText()).toEqual('');

		page.showDialog('confirm');
		page.cancelButton.click();

		expect(page.result.getText()).toEqual('2');
	});
});
