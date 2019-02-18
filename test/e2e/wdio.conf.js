const titaniumService = require('./titanium-service');

exports.config = {
	runner: 'local',
	port: 4723,
	sync: true,
	// appium auto start service doesn't work anymore with webdriver 5
	// services: [ 'appium' ],
	appium: {
		args: {
			address: '127.0.0.1',
			commandTimeout: '7200'
		}
	},
	titanium: {
		sdkVersion: '7.4.2.GA'
	},
	framework: 'jasmine',
	jasmineNodeOpts: {
		defaultTimeoutInterval: 300000,
	},
	reporters: [
		[ 'allure', {
			outputDir: 'test/e2e/reports/allure-results'
		} ],
		'spec'
	],
	maxInstances: 1,
	specs: [ 'test/e2e/specs/**/*.spec.js' ],
	capabilities: [
		{
			platformName: 'Android',
			platformVersion: '8.0',
			deviceName: 'Android Emulator',
			appWaitActivity: '*.TiActivity',
			automationName: 'UIAutomator2',
			fullReset: true
		},
		{
			platformName: 'iOS',
			platformVersion: '12.1',
			deviceName: 'iPhone 8'
		}
	],
	coloredLogs: true,
	screenshotPath: 'test/e2e/shots',
	onPrepare: titaniumService.onPrepare.bind(titaniumService)
};
