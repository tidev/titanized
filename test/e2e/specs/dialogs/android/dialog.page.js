class DialogPage {
    get okButton() {
        const button = $('android=new UiSelector().text("OK").className("android.widget.Button")');
        button.waitForExist(5000);
        return button;
    }

    get cancelButton() {
        const button = $('android=new UiSelector().text("CANCEL").className("android.widget.Button")');
        button.waitForExist(5000);
        return button;
    }

    get result() {
        const textArea = $('//TextInputLayout[@content-desc="result."]/android.widget.FrameLayout/android.widget.EditText');
        textArea.waitForExist(5000);
        return textArea;
    }

    showDialog(name) {
        $(`~show_${name}_button.`).click();
    }
}

module.exports = new DialogPage();
