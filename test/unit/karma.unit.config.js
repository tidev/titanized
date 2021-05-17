'use strict';

module.exports = config => {
	config.set({
		basePath: '../..',
		frameworks: [ 'jasmine', 'karma-typescript' ],
		files: [
			'src/**/!(*.d).ts',
			'test/unit/**/*.ts'
		],
		preprocessors: {
			'src/**/!(*.d).ts': [ 'karma-typescript' ],
			'test/unit/**/*.ts': [ 'karma-typescript' ]
		},
		reporters: [ 'mocha', 'karma-typescript' ],
		karmaTypescriptConfig: {
			tsconfig: './tsconfig.test.json'
		},
		titanium: {
			sdkVersion: '9.3.2.GA'
		},
		customLaunchers: {
			android: {
				base: 'Titanium',
				displayName: 'Android Emulator',
				platform: 'android',
			},
			ios: {
				base: 'Titanium',
				displayName: 'iOS Simulator',
				platform: 'ios'
			}
		},
		browsers: [ 'android', 'ios' ],
		singleRun: true,
		retryLimit: 0,
		captureTimeout: 300000,
		concurrency: 1
	});
};
