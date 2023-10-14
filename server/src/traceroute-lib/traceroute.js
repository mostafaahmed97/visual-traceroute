"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Traceroute = void 0;
const flag_1 = require("./flag");
const process_1 = require("./process");
class Traceroute extends process_1.Process {
    constructor(ipVersion = '', sendwait = 0.4) {
        const args = ['-q', '1', '-z', `${sendwait}`, '-n', '-I'];
        const ipFlag = flag_1.Flag.getIpFlag(ipVersion);
        if (ipFlag) {
            args.push(ipFlag);
        }
        super('traceroute', args);
    }
    parseDestination(data) {
        const regex = /^traceroute\sto\s(?:[a-zA-Z0-9:.]+)\s\(([a-zA-Z0-9:.]+)\)/;
        const parsedData = new RegExp(regex, '').exec(data);
        let result = null;
        if (parsedData !== null) {
            result = parsedData[1];
        }
        return result;
    }
    parseHop(hopData) {
        const regex = /^\s*(\d+)\s+(?:([a-zA-Z0-9:.]+)\s+([0-9.]+\s+ms)|(\*))/;
        const parsedData = new RegExp(regex, '').exec(hopData);
        let result = null;
        if (parsedData !== null) {
            if (parsedData[4] === undefined) {
                result = {
                    hop: parseInt(parsedData[1], 10),
                    ip: parsedData[2],
                    rtt1: parsedData[3]
                };
            }
            else {
                result = {
                    hop: parseInt(parsedData[1], 10),
                    ip: parsedData[4],
                    rtt1: parsedData[4]
                };
            }
        }
        return result;
    }
}
exports.Traceroute = Traceroute;
