"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("./logger");
var powerball_ticket_1 = require("../repositories/powerball-ticket");
var dotenv = require("dotenv");
var powerball_drawing_1 = require("../repositories/powerball-drawing");
var owner_winning_1 = require("../repositories/owner-winning");
var powerball_ticket_drawing_1 = require("../repositories/powerball-ticket-drawing");
var powerball_ticket_number_1 = require("../repositories/powerball-ticket-number");
var CustomOrmLogger = /** @class */ (function () {
    function CustomOrmLogger() {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    CustomOrmLogger.prototype.logQuery = function (query, parameters, _queryRunner) {
        logger_1.default.instance.verbose({ query: query, parameters: parameters });
    };
    CustomOrmLogger.prototype.logQueryError = function (error, query, parameters, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _queryRunner) {
        logger_1.default.instance.error({ error: error, query: query, parameters: parameters });
    };
    CustomOrmLogger.prototype.logQuerySlow = function (time, query, parameters, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _queryRunner) {
        logger_1.default.instance.warn({ time: time, query: query, parameters: parameters });
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    CustomOrmLogger.prototype.logSchemaBuild = function (message, _queryRunner) {
        logger_1.default.instance.verbose({ message: message });
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    CustomOrmLogger.prototype.logMigration = function (message, _queryRunner) {
        logger_1.default.instance.verbose({ message: message });
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    CustomOrmLogger.prototype.log = function (level, message, _queryRunner) {
        logger_1.default.instance.log(level, message);
    };
    return CustomOrmLogger;
}());
var TypeOrmHelpers = /** @class */ (function () {
    function TypeOrmHelpers() {
    }
    TypeOrmHelpers.getTypeOrmConnectionOptions = function () {
        dotenv.config();
        return {
            type: 'postgres',
            database: process.env.POSTGRES_INSTANCE_ID,
            host: process.env.POSTGRES_ENDPOINT,
            port: 5432,
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            synchronize: false,
            logger: new CustomOrmLogger(),
            entities: [
                powerball_ticket_1.PowerballTicketEntity,
                powerball_drawing_1.PowerballDrawingEntity,
                owner_winning_1.OwnerWinningEntity,
                powerball_ticket_drawing_1.PowerballTicketDrawingEntity,
                powerball_ticket_number_1.PowerballTicketNumberEntity
            ]
        };
    };
    return TypeOrmHelpers;
}());
exports.TypeOrmHelpers = TypeOrmHelpers;
