import { device } from 'titanized/device';

describe('DeviceEnvironemnt', () => {
    it('should report normalized platform name', () => {
        if (['iphone', 'ipad'].indexOf(Ti.Platform.osname) !== -1) {
            expect(device.platform).toEqual('ios');
        } else {
            expect(device.platform).toEqual(Ti.Platform.osname);
        }
    });
});
