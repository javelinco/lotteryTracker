"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var powerball_drawing_1 = require("./repositories/powerball-drawing");
var powerball_ticket_drawing_1 = require("./repositories/powerball-ticket-drawing");
var powerball_ticket_number_1 = require("./repositories/powerball-ticket-number");
var logger_1 = require("./helpers/logger");
var powerball_ticket_1 = require("./repositories/powerball-ticket");
var axios_1 = require("axios");
var moment = require("moment");
var date_format_1 = require("./helpers/date-format");
var owner_winning_1 = require("./repositories/owner-winning");
var uuid_1 = require("uuid");
var Powerball = /** @class */ (function () {
    function Powerball(powerballDrawingRepository, powerballTicketDrawingRepository, powerballTicketNumberRepository, powerballTicketRepository, ownerWinningRepository) {
        if (powerballDrawingRepository === void 0) { powerballDrawingRepository = new powerball_drawing_1.PowerballDrawingRepository(); }
        if (powerballTicketDrawingRepository === void 0) { powerballTicketDrawingRepository = new powerball_ticket_drawing_1.PowerballTicketDrawingRepository(); }
        if (powerballTicketNumberRepository === void 0) { powerballTicketNumberRepository = new powerball_ticket_number_1.PowerballTicketNumberRepository(); }
        if (powerballTicketRepository === void 0) { powerballTicketRepository = new powerball_ticket_1.PowerballTicketRepository(); }
        if (ownerWinningRepository === void 0) { ownerWinningRepository = new owner_winning_1.OwnerWinningRepository(); }
        this.powerballUrl = 'https://powerball.com/api/v1/numbers/powerball?_format=json';
        this.powerballDrawingRepository = powerballDrawingRepository;
        this.powerballTicketDrawingRepository = powerballTicketDrawingRepository;
        this.powerballTicketNumberRepository = powerballTicketNumberRepository;
        this.powerballTicketRepository = powerballTicketRepository;
        this.ownerWinningRepository = ownerWinningRepository;
    }
    Powerball.prototype.addTicket = function (purchaseDate, powerPlay, numbers, drawings) {
        return __awaiter(this, void 0, void 0, function () {
            var currentDate, ticket, powerballTicketNumbers, _i, numbers_1, number, powerballTicketNumber, drawingDates, powerballTicketDrawings, _a, drawingDates_1, drawingDate, powerballTicketDrawing, ownerWinnings, _b, drawingDates_2, drawingDate, powerballDrawing, calculatedWinning, totalAmount, ownerWinning, purchase;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        currentDate = new Date();
                        ticket = {
                            ticketId: uuid_1.v4(),
                            purchaseDate: purchaseDate,
                            cost: numbers.length * drawings * (powerPlay ? 3 : 2),
                            powerPlay: powerPlay,
                            createDate: currentDate,
                            updateDate: currentDate
                        };
                        return [4 /*yield*/, this.powerballTicketRepository.save(ticket)];
                    case 1:
                        _c.sent();
                        powerballTicketNumbers = [];
                        _i = 0, numbers_1 = numbers;
                        _c.label = 2;
                    case 2:
                        if (!(_i < numbers_1.length)) return [3 /*break*/, 5];
                        number = numbers_1[_i];
                        powerballTicketNumber = __assign(__assign({ ticketNumberId: uuid_1.v4(), ticketId: ticket.ticketId }, number), { createDate: currentDate, updateDate: currentDate });
                        return [4 /*yield*/, this.powerballTicketNumberRepository.save(powerballTicketNumber)];
                    case 3:
                        _c.sent();
                        powerballTicketNumbers.push(powerballTicketNumber);
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        drawingDates = this.getPowerballDrawingDates(purchaseDate, drawings);
                        powerballTicketDrawings = [];
                        _a = 0, drawingDates_1 = drawingDates;
                        _c.label = 6;
                    case 6:
                        if (!(_a < drawingDates_1.length)) return [3 /*break*/, 9];
                        drawingDate = drawingDates_1[_a];
                        powerballTicketDrawing = {
                            ticketId: ticket.ticketId,
                            drawingDate: drawingDate,
                            createDate: currentDate,
                            updateDate: currentDate
                        };
                        return [4 /*yield*/, this.powerballTicketDrawingRepository.save(powerballTicketDrawing)];
                    case 7:
                        _c.sent();
                        powerballTicketDrawings.push(powerballTicketDrawing);
                        _c.label = 8;
                    case 8:
                        _a++;
                        return [3 /*break*/, 6];
                    case 9:
                        ownerWinnings = [];
                        _b = 0, drawingDates_2 = drawingDates;
                        _c.label = 10;
                    case 10:
                        if (!(_b < drawingDates_2.length)) return [3 /*break*/, 14];
                        drawingDate = drawingDates_2[_b];
                        return [4 /*yield*/, this.powerballDrawingRepository.load(drawingDate)];
                    case 11:
                        powerballDrawing = _c.sent();
                        if (!powerballDrawing) return [3 /*break*/, 13];
                        calculatedWinning = this.calculateWinning(ticket.ticketId, ticket.powerPlay, powerballDrawing, powerballTicketNumbers, Powerball.defaultGrandPrize);
                        totalAmount = calculatedWinning.ticketNumberWinnings.reduce(function (a, b) {
                            return a + (b.amount || 0);
                        }, 0);
                        ownerWinning = {
                            ticketId: ticket.ticketId,
                            drawingDate: drawingDate,
                            amount: totalAmount,
                            createDate: currentDate,
                            updateDate: currentDate
                        };
                        return [4 /*yield*/, this.ownerWinningRepository.save(ownerWinning)];
                    case 12:
                        _c.sent();
                        ownerWinnings.push(ownerWinning);
                        _c.label = 13;
                    case 13:
                        _b++;
                        return [3 /*break*/, 10];
                    case 14:
                        purchase = {
                            ticket: ticket,
                            numbers: powerballTicketNumbers,
                            drawings: powerballTicketDrawings,
                            winnings: ownerWinnings
                        };
                        return [2 /*return*/, purchase];
                }
            });
        });
    };
    Powerball.prototype.getPowerballReportsByDrawingDate = function (drawingDate) {
        return __awaiter(this, void 0, void 0, function () {
            var powerballTicketReports, powerballTicketDrawings, _i, _a, ticketId, powerballTicket, powerballTicketReport, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        powerballTicketReports = [];
                        return [4 /*yield*/, this.powerballTicketDrawingRepository.getByDrawingDate(drawingDate)];
                    case 1:
                        powerballTicketDrawings = _c.sent();
                        _i = 0, _a = powerballTicketDrawings.map(function (x) { return x.ticketId; });
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 8];
                        ticketId = _a[_i];
                        return [4 /*yield*/, this.powerballTicketRepository.load(ticketId)];
                    case 3:
                        powerballTicket = _c.sent();
                        _b = {
                            ticket: powerballTicket
                        };
                        return [4 /*yield*/, this.powerballTicketNumberRepository.load(ticketId)];
                    case 4:
                        _b.numbers = _c.sent();
                        return [4 /*yield*/, this.powerballTicketDrawingRepository.getAllForTicket(ticketId)];
                    case 5:
                        _b.drawings = _c.sent();
                        return [4 /*yield*/, this.ownerWinningRepository.getAllForTicket(ticketId)];
                    case 6:
                        powerballTicketReport = (_b.winnings = _c.sent(),
                            _b);
                        powerballTicketReports.push(powerballTicketReport);
                        _c.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 2];
                    case 8: return [2 /*return*/, powerballTicketReports];
                }
            });
        });
    };
    Powerball.prototype.getWinningsSinceLastDrawing = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lastPowerballDrawing, powerballDrawings, drawingWinnings, _i, powerballDrawings_1, powerballDrawing, ticketIds, ticketWinnings, _a, ticketIds_1, ticketId, powerballTicket, powerballTicketNumbers, calculatedWinning, totalAmount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.powerballDrawingRepository.getLatest()];
                    case 1:
                        lastPowerballDrawing = _b.sent();
                        if (!lastPowerballDrawing) {
                            lastPowerballDrawing = {
                                drawingDate: new Date('1/1/2018'),
                                number01: 0,
                                number02: 0,
                                number03: 0,
                                number04: 0,
                                number05: 0,
                                powerNumber: 0,
                                multiplier: 0,
                                createDate: new Date(),
                                updateDate: new Date()
                            };
                        }
                        return [4 /*yield*/, this.getPowerballDrawingsSince(lastPowerballDrawing.drawingDate)];
                    case 2:
                        powerballDrawings = _b.sent();
                        drawingWinnings = [];
                        _i = 0, powerballDrawings_1 = powerballDrawings;
                        _b.label = 3;
                    case 3:
                        if (!(_i < powerballDrawings_1.length)) return [3 /*break*/, 13];
                        powerballDrawing = powerballDrawings_1[_i];
                        return [4 /*yield*/, this.powerballDrawingRepository.save(powerballDrawing)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.powerballTicketDrawingRepository.getByDrawingDate(powerballDrawing.drawingDate)];
                    case 5:
                        ticketIds = (_b.sent()).map(function (x) { return x.ticketId; });
                        ticketWinnings = [];
                        _a = 0, ticketIds_1 = ticketIds;
                        _b.label = 6;
                    case 6:
                        if (!(_a < ticketIds_1.length)) return [3 /*break*/, 11];
                        ticketId = ticketIds_1[_a];
                        return [4 /*yield*/, this.powerballTicketRepository.load(ticketId)];
                    case 7:
                        powerballTicket = _b.sent();
                        return [4 /*yield*/, this.powerballTicketNumberRepository.load(ticketId)];
                    case 8:
                        powerballTicketNumbers = _b.sent();
                        calculatedWinning = this.calculateWinning(ticketId, powerballTicket.powerPlay, powerballDrawing, powerballTicketNumbers, Powerball.defaultGrandPrize);
                        ticketWinnings.push(calculatedWinning);
                        totalAmount = calculatedWinning.ticketNumberWinnings.reduce(function (a, b) {
                            return a + (b.amount || 0);
                        }, 0);
                        return [4 /*yield*/, this.ownerWinningRepository.save({
                                ticketId: ticketId,
                                drawingDate: powerballDrawing.drawingDate,
                                amount: totalAmount,
                                createDate: new Date(),
                                updateDate: new Date()
                            })];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10:
                        _a++;
                        return [3 /*break*/, 6];
                    case 11:
                        // For each drawing, generate a report line for the ticket winnings
                        drawingWinnings.push({
                            drawingDate: powerballDrawing.drawingDate,
                            ticketWinnings: ticketWinnings
                        });
                        _b.label = 12;
                    case 12:
                        _i++;
                        return [3 /*break*/, 3];
                    case 13: 
                    // Return the winnings report
                    return [2 /*return*/, drawingWinnings];
                }
            });
        });
    };
    Powerball.prototype.calculateWinning = function (ticketId, powerplay, powerballDrawing, powerballTicketNumbers, grandPrize) {
        var ticketNumberWinnings = [];
        for (var _i = 0, powerballTicketNumbers_1 = powerballTicketNumbers; _i < powerballTicketNumbers_1.length; _i++) {
            var powerballTicketNumber = powerballTicketNumbers_1[_i];
            var ticketNumberWinning = {
                powerballTicketNumber: powerballTicketNumber,
                matches: this.getMatchCountForTicketNumber(powerballTicketNumber, powerballDrawing),
                powerNumberMatch: powerballTicketNumber.powerNumber === powerballDrawing.powerNumber,
                amount: 0
            };
            ticketNumberWinning.amount = this.calculatePrize(ticketNumberWinning.matches, ticketNumberWinning.powerNumberMatch, powerplay, powerballDrawing.multiplier, grandPrize);
            ticketNumberWinnings.push(ticketNumberWinning);
        }
        return {
            ticketId: ticketId,
            drawingDate: powerballDrawing.drawingDate,
            ticketNumberWinnings: ticketNumberWinnings
        };
    };
    Powerball.prototype.calculatePrize = function (matches, powerNumberMatch, powerPlay, multiplier, grandPrize) {
        var baseAmount = 0;
        switch (matches) {
            case 0:
                if (powerNumberMatch) {
                    baseAmount = 4;
                    return powerPlay ? baseAmount * multiplier : baseAmount;
                }
                break;
            case 1:
                if (powerNumberMatch) {
                    baseAmount = 4;
                    return powerPlay ? baseAmount * multiplier : baseAmount;
                }
                break;
            case 2:
                if (powerNumberMatch) {
                    baseAmount = 7;
                    return powerPlay ? baseAmount * multiplier : baseAmount;
                }
                break;
            case 3:
                if (powerNumberMatch) {
                    baseAmount = 100;
                    return powerPlay ? baseAmount * multiplier : baseAmount;
                }
                else {
                    baseAmount = 7;
                    return powerPlay ? baseAmount * multiplier : baseAmount;
                }
            case 4:
                if (powerNumberMatch) {
                    baseAmount = 50000;
                    return powerPlay ? baseAmount * multiplier : baseAmount;
                }
                else {
                    baseAmount = 100;
                    return powerPlay ? baseAmount * multiplier : baseAmount;
                }
            case 5:
                if (powerNumberMatch) {
                    return powerPlay ? 2000000 : 1000000;
                }
                else {
                    return grandPrize;
                }
        }
        return 0;
    };
    Powerball.prototype.getPowerballDrawingsSince = function (beginDate) {
        return __awaiter(this, void 0, void 0, function () {
            var url, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = this.powerballUrl + "&min=" + moment(beginDate)
                            .add(1, 'd')
                            .format(date_format_1.dateFormat) + "%2000:00:00&max=" + moment().format(date_format_1.dateFormat) + "%2023:59:59";
                        axios_1.default.defaults.adapter = require('axios/lib/adapters/http');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this.convert;
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 2: return [2 /*return*/, _a.apply(this, [(_b.sent()).data])];
                    case 3:
                        error_1 = _b.sent();
                        logger_1.default.instance.error(error_1);
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Powerball.prototype.getPowerballDrawingDates = function (purchaseDate, drawings) {
        var wednesdayDayOfWeek = 3;
        var saturdayDayOfWeek = 6;
        var referenceDate = new Date(purchaseDate);
        referenceDate.setHours(0, 0, 0, 0);
        var drawingDates = [];
        if (moment(referenceDate).isoWeekday() === wednesdayDayOfWeek || moment(referenceDate).isoWeekday() === saturdayDayOfWeek) {
            drawingDates.push(referenceDate);
        }
        else {
            referenceDate = moment(referenceDate)
                .add(1, 'd')
                .toDate();
        }
        var _loop_1 = function () {
            var nextWednesday = moment(referenceDate)
                .isoWeekday(wednesdayDayOfWeek)
                .toDate();
            var nextSaturday = moment(referenceDate)
                .isoWeekday(saturdayDayOfWeek)
                .toDate();
            var nextDrawing = new Date('1/1/1970');
            if (nextWednesday.getTime() >= referenceDate.getTime()) {
                nextDrawing = new Date(nextWednesday);
            }
            else if (nextSaturday.getTime() >= referenceDate.getTime()) {
                nextDrawing = new Date(nextSaturday);
            }
            if (nextDrawing.getTime() !== new Date('1/1/1970').getTime() &&
                !drawingDates.find(function (x) {
                    return x.getTime() === nextDrawing.getTime();
                })) {
                drawingDates.push(nextDrawing);
            }
            referenceDate = moment(referenceDate)
                .add(1, 'd')
                .toDate();
        };
        while (drawingDates.length < drawings &&
            referenceDate.getTime() <
                moment(purchaseDate)
                    .add(5, 'w')
                    .toDate()
                    .getTime()) {
            _loop_1();
        }
        return drawingDates;
    };
    Powerball.prototype.getMatchCountForTicketNumber = function (powerballTicketNumber, powerballDrawing) {
        var matchCount = 0;
        if (this.getMatch(powerballTicketNumber.number01, powerballDrawing)) {
            matchCount++;
        }
        if (this.getMatch(powerballTicketNumber.number02, powerballDrawing)) {
            matchCount++;
        }
        if (this.getMatch(powerballTicketNumber.number03, powerballDrawing)) {
            matchCount++;
        }
        if (this.getMatch(powerballTicketNumber.number04, powerballDrawing)) {
            matchCount++;
        }
        if (this.getMatch(powerballTicketNumber.number05, powerballDrawing)) {
            matchCount++;
        }
        return matchCount;
    };
    Powerball.prototype.getMatch = function (ticketNumber, powerballDrawing) {
        return (ticketNumber === powerballDrawing.number01 ||
            ticketNumber === powerballDrawing.number02 ||
            ticketNumber === powerballDrawing.number03 ||
            ticketNumber === powerballDrawing.number04 ||
            ticketNumber === powerballDrawing.number05);
    };
    Powerball.prototype.convert = function (powerballDrawingEntries) {
        var powerballDrawings = [];
        for (var _i = 0, powerballDrawingEntries_1 = powerballDrawingEntries; _i < powerballDrawingEntries_1.length; _i++) {
            var powerballDrawingEntry = powerballDrawingEntries_1[_i];
            var powerballNumbers = powerballDrawingEntry.field_winning_numbers.split(',');
            var powerballDrawing = {
                drawingDate: moment(powerballDrawingEntry.field_draw_date).toDate(),
                number01: +powerballNumbers[0],
                number02: +powerballNumbers[1],
                number03: +powerballNumbers[2],
                number04: +powerballNumbers[3],
                number05: +powerballNumbers[4],
                powerNumber: +powerballNumbers[5],
                multiplier: +powerballDrawingEntry.field_multiplier,
                createDate: moment().toDate(),
                updateDate: moment().toDate()
            };
            powerballDrawings.push(powerballDrawing);
        }
        return powerballDrawings;
    };
    Powerball.defaultGrandPrize = 1000000000;
    return Powerball;
}());
exports.Powerball = Powerball;
