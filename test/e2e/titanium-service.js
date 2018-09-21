const fs = require('fs-extra');
/* eslint-disable-next-line security/detect-child-process */
const spawn = require('child_process').spawn;
const path = require('path');
const tempy = require('tempy');

class TitaniumService {
	constructor() {
		this.testAppName = 'titanized-tests';
		this.rootPath = path.resolve(__dirname, '..', '..');
		this.tempPath = tempy.directory();
		this.options = {};
		this.platforms = new Set();
		this.artifacts = new Map();
	}

	onPrepare(config, capabilities) {
		this.options = config.titanium || {};

		for (const caps of capabilities) {
			this.platforms.add(caps.platformName.toLowerCase());
		}

		return Promise.resolve()
			.then(() => this.ensure)
			.then(() => this.createProject())
			.then(() => this.runNpmPack())
			.then(() => this.installNpmPackage())
			.then(() => {
				return Promise.all(Array.from(this.platforms).map(platform => this.buildProject(platform)));
			})
			.then(() => {
				for (const caps of capabilities) {
					const platformName = caps.platformName.toLowerCase();
					caps.app = this.artifacts.get(platformName);
				}
			});
	}

	ensureSdkIsInstalled() {
		if (!this.options.sdkVersion) {
			return Promise.resolve();
		}

		return this.executeCommand('titanium', [ 'sdk', 'list', '-o', 'json' ])
			.then(result => {
				let sdkList;
				try {
					sdkList = JSON.parse(result);
				} catch (e) {
					return Promise.reject(new Error('Failed to parse SDK list.'));
				}
				if (sdkList.installed[this.options.sdkVersion]) {
					return Promise.resolve();
				} else {
					return this.executeCommand('titanium', [ 'sdk', 'install', this.options.sdkVersion ]);
				}
			});
	}

	createProject() {
		const args = [
			'create',
			'--id', 'com.titanized.test.e2e',
			'-n', this.testAppName,
			'-t', 'app',
			'-u', 'localhost',
			'-d', this.tempPath,
			'-p', Array.from(this.platforms.values()).join(','),
			'--force',
			'--no-prompt',
			'--no-progress-bars',
			'--no-colors'
		];
		if (this.options.sdkVersion) {
			args.push('-s', this.options.sdkVersion);
		}
		return this.executeCommand('titanium', args)
			.then(() => {
				this.projectPath = path.join(this.tempPath, this.testAppName);
			})
			.then(() => {
				return fs.copy(path.join(__dirname, 'app', 'app.js'), path.join(this.projectPath, 'Resources', 'app.js'));
			});
	}

	runNpmPack() {
		return this.executeCommand('npm', [ 'pack' ]);
	}

	installNpmPackage() {
		const packageJsonPath = path.join(this.rootPath, 'package.json');
		const version = JSON.parse(fs.readFileSync(packageJsonPath).toString()).version;
		const archivePath = path.resolve(this.rootPath, `titanized-${version}.tgz`);
		return this.executeCommand('npm', [
			'i',
			archivePath
		], {
			cwd: path.join(this.projectPath, 'Resources')
		});
	}

	buildProject(platformName) {
		const args = [
			'build',
			'-p', platformName,
			'-d', this.projectPath,
			'--build-only'
		];
		if (this.options.sdkVersion) {
			args.push('-s', this.options.sdkVersion);
		}
		return this.executeCommand('titanium', args).then(() => {
			const buildDirectoryPath = path.join(this.projectPath, 'build', platformName === 'ios' ? 'iphone' : platformName);
			let artifactPath = '';
			if (platformName === 'android') {
				artifactPath = path.join(buildDirectoryPath, 'bin', `${this.testAppName}.apk`);
			} else if (platformName === 'ios') {
				// @todo: adjust path for device and sim builds
				artifactPath = path.join(buildDirectoryPath, 'build', 'Products', 'Debug-iphonesimulator', `${this.testAppName}.app`);
			}

			if (!fs.existsSync(artifactPath)) {
				throw new Error(`Unable to find app package for platform ${platformName} under expected path ${artifactPath}.`);
			}

			this.artifacts.set(platformName, artifactPath);
		});
	}

	executeCommand(command, args, options) {
		return new Promise((resolve, reject) => {
			let stdout = '';
			let stderr = '';
			const child = spawn(command, args, options);

			child.on('close', code => {
				if (code) {
					console.log(stdout);
					console.log(stderr);
					console.error(`${command} exited with non-zero code ${code}`);
					reject(new Error(`Failed to execute command during project prepartion step. The command was: ${command} ${args.join(' ')}`));
				}

				resolve();
			});

			child.stdout.on('data', data => {
				stdout += data.toString();
			});
			child.stderr.on('data', data => {
				stderr += data.toString();
			});

			child.on('error', err => {
				reject(err);
			});
		});
	}
}

module.exports = new TitaniumService();
