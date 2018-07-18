const wdio = require("webdriverio");

const opts = {
    port: 4723,
    desiredCapabilities: {
        platformName: "Android",
        platformVersion: "8.1.0",
        deviceName: "Android Emulator",
        app: "/Users/jvennemann/Development/appc/titanized/test/e2e/app/build/android/bin/Titanized.apk",
        automationName: "UiAutomator2",
        appWaitActivity: "*.TiActivity"
    }
};

const client = wdio.remote(opts);

client
    .init()
    .end();