describe('AlertDialog', () => {
	it('should show and accept alert dialog', () => {
		const result = $('//TextInputLayout[@content-desc="result."]/android.widget.FrameLayout/android.widget.EditText');

		expect(result.getText()).toEqual('');

		browser
			.click('~show_alert_button.')
			.click('android.widget.Button');

		expect(result.getText()).toEqual('alert_closed');
	});
});
