import * as winston from 'winston';
import * as Transport from 'winston-transport';
export default class Logger {
    private static winstonLogger;
    static get transports(): {
        [transport: string]: Transport;
    };
    static instantiate(): void;
    static get instance(): winston.Logger;
}
