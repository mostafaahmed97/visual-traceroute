"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Process = void 0;
const events_1 = __importDefault(require("events"));
const readline_1 = __importDefault(require("readline"));
const validator_1 = __importDefault(require("validator"));
const child_process_1 = require("child_process");
class Process extends events_1.default.EventEmitter {
    constructor(command, args) {
        super();
        this.command = command;
        this.args = args;
    }
    trace(domainName) {
        if (!this.isValidDomainName(domainName)) {
            throw "Invalid domain name or IP address";
        }
        this.args.push(domainName);
        const process = (0, child_process_1.spawn)(this.command, this.args);
        process.on('close', (code) => {
            this.emit('close', code);
        });
        this.emit('pid', process.pid);
        let isDestinationCaptured = false;
        if (process.pid) {
            readline_1.default.createInterface({
                input: process.stdout,
                terminal: false
            })
                .on('line', (line) => {
                if (!isDestinationCaptured) {
                    const destination = this.parseDestination(line);
                    if (destination !== null) {
                        this.emit('destination', destination);
                        isDestinationCaptured = true;
                    }
                }
                const hop = this.parseHop(line);
                if (hop !== null) {
                    this.emit('hop', hop);
                }
            });
        }
    }
    isValidDomainName(domainName) {
        return validator_1.default.isFQDN(domainName + '') || validator_1.default.isIP(domainName + '');
    }
}
exports.Process = Process;
