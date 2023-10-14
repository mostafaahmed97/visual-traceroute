import { Hop, Process } from './process';
export declare class Tracert extends Process {
    constructor(ipVersion?: string);
    parseDestination(data: string): string | null;
    parseHop(hopData: string): Hop | null;
}
