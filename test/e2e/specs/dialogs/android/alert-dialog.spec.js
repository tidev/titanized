const page = require('./dialog.page');

describe('AlertDialog', () => {
	it('should show and accept alert dialog', () => {
		expect(page.result.getText()).toEqual('');

		page.showDialog('alert');
		page.okButton.click();

		expect(page.result.getText()).toEqual('alert_closed');
	});
});
