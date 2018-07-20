describe('AlertDialog', () => {
	it('should show alert dialog', () => {
		const showAlertButton = $('~show_alert_button.');
		showAlertButton.click();
		const alertTitle = $('android=new UiSelector().resourceId("com.appc.global.classic:id/alertTitle")');
		alertTitle.waitForText(1000);
		expect(alertTitle.getText()).toEqual('Foo');
	});
});
