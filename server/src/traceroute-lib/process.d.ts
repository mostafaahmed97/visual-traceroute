/// <reference types="node" />
import events from 'events';
export interface Hop {
    hop: number;
    ip: string;
    rtt1: string;
    rtt2?: string;
    rtt3?: string;
}
export declare abstract class Process extends events.EventEmitter {
    private command;
    private args;
    constructor(command: string, args: string[]);
    trace(domainName: string): void;
    private isValidDomainName;
    abstract parseDestination(data: string): string | null;
    abstract parseHop(hopData: string): Hop | null;
}
