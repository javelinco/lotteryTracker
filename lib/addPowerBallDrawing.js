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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts_postgres_1 = require("ts-postgres");
var postgressConfig_1 = require("./configuration/postgressConfig");
var moment = require("moment");
var dateFormat_1 = require("./helpers/dateFormat");
function AddPowerBallDrawing(drawingDate, number, multiplier, grandPrizeAmount, getDrawingNumbersFunc, recordDrawingFunc, recordWinningsFunc) {
    if (getDrawingNumbersFunc === void 0) { getDrawingNumbersFunc = getDrawingNumbers; }
    if (recordDrawingFunc === void 0) { recordDrawingFunc = recordDrawing; }
    if (recordWinningsFunc === void 0) { recordWinningsFunc = recordWinnings; }
    return __awaiter(this, void 0, void 0, function () {
        var currentDate, powerballDrawing, ownerWinnings, drawingNumbers;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentDate = new Date();
                    powerballDrawing = {
                        drawingDate: drawingDate,
                        number01: number.number01,
                        number02: number.number02,
                        number03: number.number03,
                        number04: number.number04,
                        number05: number.number05,
                        powerNumber: number.powerNumber,
                        createDate: currentDate,
                        updateDate: currentDate
                    };
                    if (!recordDrawingFunc) return [3 /*break*/, 2];
                    return [4 /*yield*/, recordDrawingFunc(powerballDrawing)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    ownerWinnings = [];
                    if (!getDrawingNumbersFunc) return [3 /*break*/, 4];
                    return [4 /*yield*/, getDrawingNumbersFunc(drawingDate)];
                case 3:
                    drawingNumbers = _a.sent();
                    drawingNumbers.map(function (drawingNumber) { return __awaiter(_this, void 0, void 0, function () {
                        var matchCount, winningAmount, ownerWinning;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    matchCount = 0;
                                    if (getMatch(drawingNumber.number01, number)) {
                                        matchCount++;
                                    }
                                    winningAmount = getWinningAmount(matchCount, drawingNumber.powerNumber === number.powerNumber, drawingNumber.powerPlay ? multiplier : 1, grandPrizeAmount);
                                    ownerWinning = {
                                        ticketId: drawingNumber.ticketId,
                                        drawingDate: drawingDate,
                                        amount: winningAmount,
                                        createDate: currentDate,
                                        updateDate: currentDate
                                    };
                                    ownerWinnings.push(ownerWinning);
                                    if (!recordWinningsFunc) return [3 /*break*/, 2];
                                    return [4 /*yield*/, recordWinningsFunc(ownerWinning)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); });
                    _a.label = 4;
                case 4: return [2 /*return*/, ownerWinnings];
            }
        });
    });
}
exports.AddPowerBallDrawing = AddPowerBallDrawing;
function getMatch(checkNumber, drawingNumber) {
    return checkNumber === drawingNumber.number01
        || checkNumber === drawingNumber.number02
        || checkNumber === drawingNumber.number03
        || checkNumber === drawingNumber.number04
        || checkNumber === drawingNumber.number05;
}
function getWinningAmount(matchCount, powerNumberMatch, multiplier, grandPrizeAmount) {
    if (powerNumberMatch) {
        if (matchCount > 4) {
            return grandPrizeAmount;
        }
        else if (matchCount > 3) {
            return 50000 * multiplier;
        }
        else if (matchCount > 2) {
            return 100 * multiplier;
        }
        else if (matchCount > 1) {
            return 7 * multiplier;
        }
        else {
            return 4 * multiplier;
        }
    }
    else {
        if (matchCount > 4) {
            return multiplier !== 1 ? 2000000 : 1000000;
        }
        else if (matchCount > 3) {
            return 100 * multiplier;
        }
        else if (matchCount > 2) {
            return 7 * multiplier;
        }
    }
    return 0;
}
function recordDrawing(drawing) {
    return __awaiter(this, void 0, void 0, function () {
        var client, powerballDrawingQuery, e_1;
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
                    powerballDrawingQuery = 'INSERT INTO PowerballDrawing '
                        + '(DrawingDate, Number01, Number02, Number03, Number04, Number05, PowerNumber, CreateDate, UpdateDate) '
                        + 'VALUES ( '
                        + ("'" + moment(drawing.drawingDate).format(dateFormat_1.dateFormat) + "', ")
                        + (drawing.number01 + ", ")
                        + (drawing.number02 + ", ")
                        + (drawing.number03 + ", ")
                        + (drawing.number04 + ", ")
                        + (drawing.number05 + ", ")
                        + (drawing.powerNumber + ", ")
                        + ("'" + moment(drawing.createDate).format(dateFormat_1.dateTimeFormat) + "', ")
                        + ("'" + moment(drawing.updateDate).format(dateFormat_1.dateTimeFormat) + "') ")
                        + 'ON CONFLICT (drawingDate) DO UPDATE '
                        + ("SET Number01 = " + drawing.number01 + ", ")
                        + (" Number02 = " + drawing.number02 + ", ")
                        + (" Number03 = " + drawing.number03 + ", ")
                        + (" Number04 = " + drawing.number04 + ", ")
                        + (" Number05 = " + drawing.number05 + ", ")
                        + (" PowerNumber = " + drawing.powerNumber + ", ")
                        + (" UpdateDate = '" + moment(drawing.updateDate).format(dateFormat_1.dateTimeFormat) + "'");
                    return [4 /*yield*/, client.query(powerballDrawingQuery)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 4:
                    e_1 = _a.sent();
                    console.log('Error encountered while processing data:', e_1);
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
function getDrawingNumbers(drawingDate) {
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function () {
        var client, drawingNumbers, ticketQuery, stream, stream_1, stream_1_1, dataRow, number, e_2_1, e_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    client = new ts_postgres_1.Client(postgressConfig_1.postgresConfig);
                    drawingNumbers = [];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 15, 16, 19]);
                    return [4 /*yield*/, client.connect()];
                case 2:
                    _b.sent();
                    ticketQuery = 'SELECT n.*, t.PowerPlay '
                        + 'FROM PowerballTicketDrawing d '
                        + '    INNER JOIN PowerballTicketNumber n ON d.TicketId = n.TicketId '
                        + '    INNER JOIN PowerballTicket t ON d.TicketId = t.TicketId '
                        + ("WHERE d.DrawingDate = '" + moment(drawingDate).format(dateFormat_1.dateFormat) + "'");
                    stream = client.query(ticketQuery);
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 8, 9, 14]);
                    stream_1 = __asyncValues(stream);
                    _b.label = 4;
                case 4: return [4 /*yield*/, stream_1.next()];
                case 5:
                    if (!(stream_1_1 = _b.sent(), !stream_1_1.done)) return [3 /*break*/, 7];
                    dataRow = stream_1_1.value;
                    number = {
                        ticketId: "" + dataRow.get('ticketid'),
                        number01: Number(dataRow.get('number01')) || 0,
                        number02: Number(dataRow.get('number02')) || 0,
                        number03: Number(dataRow.get('number03')) || 0,
                        number04: Number(dataRow.get('number04')) || 0,
                        number05: Number(dataRow.get('number05')) || 0,
                        powerNumber: Number(dataRow.get('powernumber')) || 0,
                        powerPlay: "" + dataRow.get('powerplay') === 'true'
                    };
                    drawingNumbers.push(number);
                    _b.label = 6;
                case 6: return [3 /*break*/, 4];
                case 7: return [3 /*break*/, 14];
                case 8:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 14];
                case 9:
                    _b.trys.push([9, , 12, 13]);
                    if (!(stream_1_1 && !stream_1_1.done && (_a = stream_1.return))) return [3 /*break*/, 11];
                    return [4 /*yield*/, _a.call(stream_1)];
                case 10:
                    _b.sent();
                    _b.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 13: return [7 /*endfinally*/];
                case 14: return [3 /*break*/, 19];
                case 15:
                    e_3 = _b.sent();
                    console.log('Error encountered while processing data:', e_3);
                    return [3 /*break*/, 19];
                case 16:
                    if (!!client.closed) return [3 /*break*/, 18];
                    return [4 /*yield*/, client.end()];
                case 17:
                    _b.sent();
                    _b.label = 18;
                case 18: return [7 /*endfinally*/];
                case 19: return [2 /*return*/, drawingNumbers];
            }
        });
    });
}
function recordWinnings(winning) {
    return __awaiter(this, void 0, void 0, function () {
        var client, ownerWinningQuery, e_4;
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
                    ownerWinningQuery = 'INSERT INTO OwnerWinning '
                        + '(TicketId, DrawingDate, Amount, CreateDate, UpdateDate) '
                        + 'VALUES ( '
                        + ("'" + winning.ticketId + "', ")
                        + ("'" + moment(winning.drawingDate).format(dateFormat_1.dateFormat) + "', ")
                        + (winning.amount + ", ")
                        + ("'" + moment(winning.createDate).format(dateFormat_1.dateTimeFormat) + "', ")
                        + ("'" + moment(winning.updateDate).format(dateFormat_1.dateTimeFormat) + "') ")
                        + 'ON CONFLICT (TicketId, DrawingDate) DO UPDATE '
                        + ("SET Amount = " + winning.amount + " + COALESCE (Amount, 0), ")
                        + ("    UpdateDate = '" + moment(winning.updateDate).format(dateFormat_1.dateTimeFormat) + "'");
                    return [4 /*yield*/, client.query(ownerWinningQuery)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 4:
                    e_4 = _a.sent();
                    console.log('Error encountered while processing data:', e_4);
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
