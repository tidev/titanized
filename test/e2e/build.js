module.exports = {
	name: 'Titanium Build Plugin',
	before: (globals) => {
		return createArtifacts(globals.test_settings);
	}
};

function createArtifacts(testSettings) {
	const requiredPlatforms = new Set();
	Object.keys(testSettings).forEach(envName => {
		const settings = testSettings[envName];
		const platformName = settings.platformName.toLowerCase();
		requiredPlatforms.add(platformName);
	});

	// todo: build app for required platforms and set "app" key in test settings

	return Promise.resolve();
}
