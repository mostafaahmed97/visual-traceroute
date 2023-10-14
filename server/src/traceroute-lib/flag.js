"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flag = void 0;
class Flag {
    static getIpFlag(ipVersion) {
        let ipFlag = '';
        switch (ipVersion) {
            case 'ipv4':
                ipFlag = '-4';
                break;
            case 'ipv6':
                ipFlag = '-6';
                break;
            default:
                ipFlag = '';
        }
        return ipFlag;
    }
}
exports.Flag = Flag;
