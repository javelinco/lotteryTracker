"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
var _a = winston.format, combine = _a.combine, timestamp = _a.timestamp, prettyPrint = _a.prettyPrint, json = _a.json, metadata = _a.metadata;
var DefaultLogFormat = combine(timestamp(), prettyPrint(), json(), metadata());
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Object.defineProperty(Logger, "transports", {
        get: function () {
            var logLevel = process.env.LOG_LEVEL || 'info';
            var result = {
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
        },
        enumerable: true,
        configurable: true
    });
    Logger.instantiate = function () {
        var _this = this;
        this.winstonLogger = winston.createLogger({
            transports: Object.keys(this.transports).map(function (transport) { return _this.transports[transport]; })
        });
    };
    Object.defineProperty(Logger, "instance", {
        get: function () {
            if (this.winstonLogger === undefined) {
                this.instantiate();
            }
            return this.winstonLogger;
        },
        enumerable: true,
        configurable: true
    });
    return Logger;
}());
exports.default = Logger;
