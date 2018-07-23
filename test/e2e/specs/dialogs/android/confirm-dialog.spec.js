const page = Object.create({}, {
	okButton: {
		get: () => {
			const button = $('android=new UiSelector().text("OK").className("android.widget.Button")');
			button.waitForExist(2000);
			return button;
		}
	},
	cancelButton: {
		get: () => {
			const button = $('android=new UiSelector().text("CANCEL").className("android.widget.Button")');
			button.waitForExist(2000);
			return button;
		}
	},
	showDialog: {
		value: () => {
			$('~show_confirm_button.').click();
		}
	},
	result: {
		get: () => $('//TextInputLayout[@content-desc="result."]/android.widget.FrameLayout/android.widget.EditText')
	}
});

describe('ConfirmDialog', () => {
	beforeEach(() => {
		page.result.clearElement();
	});

	it('should show and accept confirm dialog', () => {
		expect(page.result.getText()).toEqual('');

		page.showDialog();
		page.okButton.click();

		expect(page.result.getText()).toEqual('0');
	});

	it('should show and decline confirm dialog', () => {
		expect(page.result.getText()).toEqual('');

		page.showDialog();
		page.cancelButton.click();

		expect(page.result.getText()).toEqual('2');
	});
});
