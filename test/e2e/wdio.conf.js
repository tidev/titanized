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
	titanium: {
		sdkVersion: '7.4.0.GA'
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
	specs: [ 'test/e2e/specs/**/*.spec.js' ],
	capabilities: [
		{
			platformName: 'Android',
			platformVersion: '8.0',
			deviceName: 'AndroidTestDevice',
			appWaitActivity: '*.TiActivity',
			automationName: 'UIAutomator2',
			fullReset: true
		},
		{
			platformName: 'iOS',
			platformVersion: '12.0',
			deviceName: 'iPhone 8'
		}
	],
	coloredLogs: true,
	screenshotPath: 'test/e2e/shots',
	logLevel: 'verbose',
	onPrepare: titaniumService.onPrepare.bind(titaniumService)
};
