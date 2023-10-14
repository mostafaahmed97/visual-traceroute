"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracert = void 0;
const flag_1 = require("./flag");
const process_1 = require("./process");
class Tracert extends process_1.Process {
    constructor(ipVersion = '') {
        const args = ['-d'];
        const ipFlag = flag_1.Flag.getIpFlag(ipVersion);
        if (ipFlag) {
            args.push(ipFlag);
        }
        super('tracert', args);
    }
    parseDestination(data) {
        const regex = /^Tracing\sroute\sto\s([a-zA-Z0-9:.]+)\s(?:\[([a-zA-Z0-9:.]+)\])?/;
        const parsedData = new RegExp(regex, '').exec(data);
        let result = null;
        if (parsedData !== null) {
            if (parsedData[2] !== undefined) {
                result = parsedData[2];
            }
            else {
                result = parsedData[1];
            }
        }
        return result;
    }
    parseHop(hopData) {
        const regex = /^\s*(\d*)\s*(<?\d+\sms|\*)\s*(<?\d+\sms|\*)\s*(<?\d+\sms|\*)\s*([a-zA-Z0-9:.\s]+)/;
        const parsedData = new RegExp(regex, '').exec(hopData);
        let result = null;
        if (parsedData !== null) {
            result = {
                hop: parseInt(parsedData[1], 10),
                rtt1: parsedData[2],
                rtt2: parsedData[3],
                rtt3: parsedData[4],
                ip: parsedData[5].trim()
            };
        }
        return result;
    }
}
exports.Tracert = Tracert;
