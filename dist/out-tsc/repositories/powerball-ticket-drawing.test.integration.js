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
var dotenv = require("dotenv");
var typeorm_1 = require("typeorm");
var uuid_1 = require("uuid");
var test_powerball_ticket_1 = require("../helpers/test-powerball-ticket");
var powerball_ticket_1 = require("./powerball-ticket");
var orm_helpers_1 = require("../helpers/orm-helpers");
var powerball_ticket_drawing_1 = require("./powerball-ticket-drawing");
describe('Integration - PowerballTicketDrawing CRUD Operations', function () {
    var powerballTicketDrawingRepository = new powerball_ticket_drawing_1.PowerballTicketDrawingRepository();
    var powerballTicketRepository = new powerball_ticket_1.PowerballTicketRepository();
    var ticketIds = [];
    var ownerId = uuid_1.v4();
    function createPowerballTicketDrawing(drawingDate, ticketId) {
        if (ticketId === void 0) { ticketId = uuid_1.v4(); }
        return __awaiter(this, void 0, void 0, function () {
            var testTicket;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testTicket = test_powerball_ticket_1.createTicket(ticketId, ownerId);
                        return [4 /*yield*/, powerballTicketRepository.save(testTicket)];
                    case 1:
                        _a.sent();
                        ticketIds.push(testTicket.ticketId);
                        return [2 /*return*/, {
                                ticketId: testTicket.ticketId,
                                drawingDate: drawingDate,
                                createDate: new Date('1/1/2000'),
                                updateDate: new Date('1/1/2000')
                            }];
                }
            });
        });
    }
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dotenv.config();
                    return [4 /*yield*/, typeorm_1.createConnection(orm_helpers_1.TypeOrmHelpers.getTypeOrmConnectionOptions())];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var _i, ticketIds_1, ticketId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, ticketIds_1 = ticketIds;
                    _a.label = 1;
                case 1:
                    if (!(_i < ticketIds_1.length)) return [3 /*break*/, 4];
                    ticketId = ticketIds_1[_i];
                    return [4 /*yield*/, powerballTicketRepository.delete(ticketId)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, typeorm_1.getConnection().close()];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should Save, Load and Delete', function () { return __awaiter(void 0, void 0, void 0, function () {
        var testPowerballTicketDrawing, saved, loaded, deleted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createPowerballTicketDrawing(new Date('1/1/2000'))];
                case 1:
                    testPowerballTicketDrawing = _a.sent();
                    return [4 /*yield*/, powerballTicketDrawingRepository.save(testPowerballTicketDrawing)];
                case 2:
                    saved = _a.sent();
                    return [4 /*yield*/, powerballTicketDrawingRepository.load(testPowerballTicketDrawing.ticketId, testPowerballTicketDrawing.drawingDate)];
                case 3:
                    loaded = _a.sent();
                    return [4 /*yield*/, powerballTicketDrawingRepository.delete(testPowerballTicketDrawing.ticketId, testPowerballTicketDrawing.drawingDate)];
                case 4:
                    deleted = _a.sent();
                    expect(saved).toEqual(testPowerballTicketDrawing);
                    expect(loaded).toEqual(testPowerballTicketDrawing);
                    expect(deleted).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should Get All Given Drawing Date', function () { return __awaiter(void 0, void 0, void 0, function () {
        var drawingDate, expectedDrawings, _a, drawings, _i, expectedDrawings_1, expectedDrawing;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    drawingDate = new Date('1/1/2000');
                    return [4 /*yield*/, createPowerballTicketDrawing(drawingDate)];
                case 1:
                    _a = [
                        _b.sent()
                    ];
                    return [4 /*yield*/, createPowerballTicketDrawing(drawingDate)];
                case 2:
                    _a = _a.concat([
                        _b.sent()
                    ]);
                    return [4 /*yield*/, createPowerballTicketDrawing(drawingDate)];
                case 3:
                    expectedDrawings = _a.concat([
                        _b.sent()
                    ]);
                    return [4 /*yield*/, powerballTicketDrawingRepository.save(expectedDrawings[0])];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, powerballTicketDrawingRepository.save(expectedDrawings[1])];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, powerballTicketDrawingRepository.save(expectedDrawings[2])];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, powerballTicketDrawingRepository.getByDrawingDate(drawingDate)];
                case 7:
                    drawings = _b.sent();
                    expect(drawings).toEqual(expectedDrawings);
                    _i = 0, expectedDrawings_1 = expectedDrawings;
                    _b.label = 8;
                case 8:
                    if (!(_i < expectedDrawings_1.length)) return [3 /*break*/, 11];
                    expectedDrawing = expectedDrawings_1[_i];
                    return [4 /*yield*/, powerballTicketDrawingRepository.delete(expectedDrawing.ticketId, expectedDrawing.drawingDate)];
                case 9:
                    _b.sent();
                    _b.label = 10;
                case 10:
                    _i++;
                    return [3 /*break*/, 8];
                case 11: return [2 /*return*/];
            }
        });
    }); });
    it('Should get all for a given ticket id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var ticketId, expectedDrawings, _a, drawings, _i, expectedDrawings_2, expectedDrawing;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ticketId = uuid_1.v4();
                    return [4 /*yield*/, createPowerballTicketDrawing(new Date('1/1/2020'), ticketId)];
                case 1:
                    _a = [
                        _b.sent()
                    ];
                    return [4 /*yield*/, createPowerballTicketDrawing(new Date('1/2/2020'), ticketId)];
                case 2:
                    _a = _a.concat([
                        _b.sent()
                    ]);
                    return [4 /*yield*/, createPowerballTicketDrawing(new Date('1/3/2020'), ticketId)];
                case 3:
                    expectedDrawings = _a.concat([
                        _b.sent()
                    ]);
                    return [4 /*yield*/, powerballTicketDrawingRepository.save(expectedDrawings[0])];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, powerballTicketDrawingRepository.save(expectedDrawings[1])];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, powerballTicketDrawingRepository.save(expectedDrawings[2])];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, powerballTicketDrawingRepository.getAllForTicket(ticketId)];
                case 7:
                    drawings = _b.sent();
                    expect(drawings).toEqual(expectedDrawings);
                    _i = 0, expectedDrawings_2 = expectedDrawings;
                    _b.label = 8;
                case 8:
                    if (!(_i < expectedDrawings_2.length)) return [3 /*break*/, 11];
                    expectedDrawing = expectedDrawings_2[_i];
                    return [4 /*yield*/, powerballTicketDrawingRepository.delete(expectedDrawing.ticketId, expectedDrawing.drawingDate)];
                case 9:
                    _b.sent();
                    _b.label = 10;
                case 10:
                    _i++;
                    return [3 /*break*/, 8];
                case 11: return [2 /*return*/];
            }
        });
    }); });
});
