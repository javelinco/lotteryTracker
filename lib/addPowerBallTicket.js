"use strict";
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
var uuid_1 = require("uuid");
var ts_postgres_1 = require("ts-postgres");
var postgressConfig_1 = require("./configuration/postgressConfig");
var moment = require("moment");
var dateFormat_1 = require("./helpers/dateFormat");
function AddPowerballTicket(purchaseDate, powerPlay, numbers, drawings, databaseSave) {
    if (databaseSave === void 0) { databaseSave = recordPurchase; }
    return __awaiter(this, void 0, void 0, function () {
        var currentDate, powerballTicket, powerballNumbers, powerballTicketDrawings, powerballTicketPurchase;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentDate = new Date();
                    powerballTicket = {
                        ticketId: uuid_1.v4(),
                        purchaseDate: purchaseDate,
                        cost: numbers.length * drawings * (powerPlay ? 3 : 2),
                        powerPlay: powerPlay,
                        createDate: currentDate,
                        updateDate: currentDate
                    };
                    powerballNumbers = numbers.map(function (number) {
                        return {
                            ticketNumberId: uuid_1.v4(),
                            ticketId: powerballTicket.ticketId,
                            number01: number.number01,
                            number02: number.number02,
                            number03: number.number03,
                            number04: number.number04,
                            number05: number.number05,
                            powerNumber: number.powerNumber,
                            createDate: currentDate,
                            updateDate: currentDate
                        };
                    });
                    powerballTicketDrawings = getPowerballDrawingDates(purchaseDate, drawings).map(function (drawingDate) {
                        return {
                            ticketId: powerballTicket.ticketId,
                            drawingDate: drawingDate,
                            createDate: currentDate,
                            updateDate: currentDate
                        };
                    });
                    powerballTicketPurchase = {
                        ticket: powerballTicket,
                        numbers: powerballNumbers,
                        drawings: powerballTicketDrawings
                    };
                    if (!databaseSave) return [3 /*break*/, 2];
                    return [4 /*yield*/, databaseSave(powerballTicketPurchase)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/, powerballTicketPurchase];
            }
        });
    });
}
exports.AddPowerballTicket = AddPowerballTicket;
function recordPurchase(purchase) {
    return __awaiter(this, void 0, void 0, function () {
        var client, powerballTicketQuery, e_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new ts_postgres_1.Client(postgressConfig_1.postgresConfig);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 8]);
                    return [4 /*yield*/, client.connect()];
                case 2:
                    _a.sent();
                    powerballTicketQuery = 'INSERT INTO PowerballTicket '
                        + '(TicketId, PurchaseDate, Cost, PowerPlay, OwnerId, CreateDate, UpdateDate) '
                        + 'VALUES ( '
                        + ("'" + purchase.ticket.ticketId + "', ")
                        + ("'" + moment(purchase.ticket.purchaseDate).format(dateFormat_1.dateFormat) + "', ")
                        + (purchase.ticket.cost + ", ")
                        + (purchase.ticket.powerPlay + ", ")
                        + (purchase.ticket.ownerId === undefined ? 'NULL, ' : "'" + purchase.ticket.ownerId + "', ")
                        + ("'" + moment(purchase.ticket.createDate).format(dateFormat_1.dateTimeFormat) + "' ,")
                        + ("'" + moment(purchase.ticket.updateDate).format(dateFormat_1.dateTimeFormat) + "') ")
                        + 'ON CONFLICT (TicketId) DO UPDATE '
                        + ("SET PurchaseDate = '" + moment(purchase.ticket.purchaseDate).format(dateFormat_1.dateFormat) + "', ")
                        + (" Cost = " + purchase.ticket.cost + ", ")
                        + (" PowerPlay = " + purchase.ticket.powerPlay + ", ")
                        + ' OwnerId = ' + (purchase.ticket.ownerId === undefined ? 'NULL' : "'" + purchase.ticket.ownerId + "'") + ', '
                        + (" UpdateDate = '" + moment(purchase.ticket.updateDate).format(dateFormat_1.dateTimeFormat) + "'");
                    return [4 /*yield*/, client.query(powerballTicketQuery)];
                case 3:
                    _a.sent();
                    //PowerballTicketNumbers
                    purchase.numbers.forEach(function (number) { return __awaiter(_this, void 0, void 0, function () {
                        var powerballTicketNumberQuery;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    powerballTicketNumberQuery = 'INSERT INTO PowerballTicketNumber '
                                        + '(TicketNumberId, TicketId, Number01, Number02, Number03, Number04, Number05, PowerNumber, CreateDate, UpdateDate) '
                                        + 'VALUES ( '
                                        + ("'" + number.ticketNumberId + "', ")
                                        + ("'" + number.ticketId + "', ")
                                        + (number.number01 + ", ")
                                        + (number.number02 + ", ")
                                        + (number.number03 + ", ")
                                        + (number.number04 + ", ")
                                        + (number.number05 + ", ")
                                        + (number.powerNumber + ", ")
                                        + ("'" + moment(purchase.ticket.createDate).format(dateFormat_1.dateTimeFormat) + "' ,")
                                        + ("'" + moment(purchase.ticket.updateDate).format(dateFormat_1.dateTimeFormat) + "') ")
                                        + 'ON CONFLICT (TicketNumberId) DO UPDATE '
                                        + ("SET TicketId = '" + number.ticketId + "', ")
                                        + (" Number01 = " + number.number01 + ", ")
                                        + (" Number02 = " + number.number02 + ", ")
                                        + (" Number03 = " + number.number03 + ", ")
                                        + (" Number04 = " + number.number04 + ", ")
                                        + (" Number05 = " + number.number05 + ", ")
                                        + (" PowerNumber = " + number.powerNumber + ", ")
                                        + (" UpdateDate = '" + moment(purchase.ticket.updateDate).format(dateFormat_1.dateTimeFormat) + "'");
                                    return [4 /*yield*/, client.query(powerballTicketNumberQuery)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    //PowerballTicketDrawing
                    purchase.drawings.forEach(function (drawing) { return __awaiter(_this, void 0, void 0, function () {
                        var powerballTicketDrawingQuery;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    powerballTicketDrawingQuery = 'INSERT INTO PowerballTicketDrawing '
                                        + '(TicketId, DrawingDate, CreateDate, UpdateDate) '
                                        + 'VALUES ( '
                                        + ("'" + drawing.ticketId + "', ")
                                        + ("'" + moment(drawing.drawingDate).format(dateFormat_1.dateFormat) + "', ")
                                        + ("'" + moment(purchase.ticket.createDate).format(dateFormat_1.dateTimeFormat) + "' ,")
                                        + ("'" + moment(purchase.ticket.updateDate).format(dateFormat_1.dateTimeFormat) + "') ")
                                        + 'ON CONFLICT (TicketId, DrawingDate) DO NOTHING ';
                                    return [4 /*yield*/, client.query(powerballTicketDrawingQuery)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [3 /*break*/, 8];
                case 4:
                    e_1 = _a.sent();
                    console.log('Error encountered while inserting data:', e_1);
                    return [3 /*break*/, 8];
                case 5:
                    if (!!client.closed) return [3 /*break*/, 7];
                    return [4 /*yield*/, client.end()];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function getPowerballDrawingDates(purchaseDate, drawings) {
    var wednesdayDayOfWeek = 3;
    var saturdayDayOfWeek = 6;
    var lengthOfWeek = 7;
    var referenceDate = new Date(purchaseDate);
    referenceDate.setHours(0, 0, 0, 0);
    var drawingDates = [];
    for (var index = 0; index < drawings; index++) {
        var nextWednesday = new Date(referenceDate);
        nextWednesday.setDate(nextWednesday.getDate() + (wednesdayDayOfWeek + lengthOfWeek - nextWednesday.getDay()) % 7);
        var nextSaturday = new Date(referenceDate);
        nextSaturday.setDate(nextSaturday.getDate() + (saturdayDayOfWeek + lengthOfWeek - nextSaturday.getDay()) % 7);
        var nextDrawing = void 0;
        if (nextWednesday > nextSaturday) {
            nextDrawing = new Date(nextSaturday);
        }
        else {
            nextDrawing = new Date(nextWednesday);
        }
        drawingDates.push(nextDrawing);
        referenceDate.setDate(nextDrawing.getDate() + 1);
    }
    return drawingDates;
}
