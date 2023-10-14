import { Hop, Process } from './process';
export declare class Traceroute extends Process {
    constructor(ipVersion?: string, sendwait?: number);
    parseDestination(data: string): string | null;
    parseHop(hopData: string): Hop | null;
}
