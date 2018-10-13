export class DeviceEnvironment {
    get platform() {
        if ([ 'iphone', 'ipad' ].indexOf(Ti.Platform.osname) !== -1) {
            return 'ios';
        }

        return Ti.Platform.osname;
    }

    public runs(platform: string): boolean {
        return platform === this.platform;
    }
}
