"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const tracert_1 = require("./tracert");
const traceroute_1 = require("./traceroute");
module.exports = os_1.default.platform() === 'win32' ? tracert_1.Tracert : traceroute_1.Traceroute;
exports.default = os_1.default.platform() === 'win32' ? tracert_1.Tracert : traceroute_1.Traceroute;
