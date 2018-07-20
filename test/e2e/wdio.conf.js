const titaniumService = require('./titanium-service');

exports.config = {
	port: 4723,
	services: ['appium'],
	appium: {
		args: {
			address: '127.0.0.1',
			commandTimeout: '7200'
		}
	},
	specs: [
		'test/e2e/specs/**'
	],
	framework: 'jasmine',
	jasmineNodeOpts: {
		defaultTimeoutInterval: 300000,
	},
	reporters: [ 'spec' ],
	reporterOptions: {
		outputDir: 'test/e2e/reports'
	},
	capabilities: [ {
		platformName: 'Android',
		platformVersion: '8.0',
		deviceName: 'Android Virtual Device (Nexus 5X)',
		avd: 'Nexus_5X_API_26',
		app: '/Users/jvennemann/Development/appc/global-test-classic/build/android/bin/global-test-classic.apk',
		appWaitActivity: '*.TiActivity',
		automationName: 'UIAutomator2'
	} ],
	coloredLogs: true,
	screenshotPath: 'test/e2e/shots',
	logLevel: 'verbose',
	onPrepare: titaniumService.onPrepare
};
