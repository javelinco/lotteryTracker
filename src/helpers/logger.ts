import * as winston from 'winston';
import * as Transport from 'winston-transport';

const { combine, timestamp, prettyPrint, json, metadata } = winston.format;
const DefaultLogFormat = combine(
    timestamp(),
    prettyPrint(),
    json(),
    metadata()
);

export default class Logger {
    private static winstonLogger: winston.Logger;

    public static get transports(): {[transport: string]: Transport} {
        const logLevel = process.env.LOG_LEVEL || 'info';

        const result: { [transport: string]: Transport } = {
            console: new winston.transports.Console({
                format: DefaultLogFormat,
                level: logLevel
            })
        };
        if (process.env.LOG_FILE) {
            result['file'] = new winston.transports.File({
                filename: process.env.LOG_FILE,
                level: logLevel,
                format: DefaultLogFormat
            });
        }

        return result;
    }

    public static instantiate(): void {
        this.winstonLogger = winston.createLogger({
            transports: Object.keys(this.transports).map(transport => this.transports[transport])
        });
    }

    public static get instance(): winston.Logger {
        if (this.winstonLogger === undefined) {
            this.instantiate();
        }
        return this.winstonLogger;
    }
}