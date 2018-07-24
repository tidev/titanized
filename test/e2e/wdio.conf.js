const titaniumService = require('./titanium-service');

exports.config = {
	port: 4723,
	services: [ 'appium' ],
	appium: {
		args: {
			address: '127.0.0.1',
			commandTimeout: '7200'
		}
	},
	framework: 'jasmine',
	jasmineNodeOpts: {
		defaultTimeoutInterval: 300000,
	},
	reporters: [ 'spec' ],
	reporterOptions: {
		outputDir: 'test/e2e/reports'
	},
	maxInstances: 1,
	capabilities: [ {
		platformName: 'Android',
		platformVersion: '8.0',
		deviceName: 'AndroidTestDevice',
		avd: 'Nexus_5X_API_26',
		appWaitActivity: '*.TiActivity',
		automationName: 'UIAutomator2',
		specs: [ 'test/e2e/specs/*/android/**/*.spec.js' ],
		fullReset: true
	} ],
	coloredLogs: true,
	screenshotPath: 'test/e2e/shots',
	logLevel: 'verbose',
	onPrepare: titaniumService.onPrepare.bind(titaniumService)
};
