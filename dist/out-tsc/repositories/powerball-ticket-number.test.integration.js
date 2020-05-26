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
var powerball_ticket_number_1 = require("./powerball-ticket-number");
var dotenv = require("dotenv");
var typeorm_1 = require("typeorm");
var uuid_1 = require("uuid");
var test_powerball_ticket_1 = require("../helpers/test-powerball-ticket");
var powerball_ticket_1 = require("./powerball-ticket");
var orm_helpers_1 = require("../helpers/orm-helpers");
describe('Integration - PowerballTicketNumber CRUD Operations', function () {
    var powerballTicketNumberRepository = new powerball_ticket_number_1.PowerballTicketNumberRepository();
    var powerballTicketRepository = new powerball_ticket_1.PowerballTicketRepository();
    var ownerId = uuid_1.v4();
    var testTicket = test_powerball_ticket_1.createTicket(uuid_1.v4(), ownerId);
    var testPowerballTicketNumber = {
        ticketNumberId: uuid_1.v4(),
        ticketId: testTicket.ticketId,
        number01: 1,
        number02: 2,
        number03: 3,
        number04: 4,
        number05: 5,
        powerNumber: 6,
        createDate: new Date('1/1/2000'),
        updateDate: new Date('1/1/2000')
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dotenv.config();
                    return [4 /*yield*/, typeorm_1.createConnection(orm_helpers_1.TypeOrmHelpers.getTypeOrmConnectionOptions())];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, powerballTicketRepository.save(testTicket)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, powerballTicketRepository.delete(testTicket.ticketId)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, typeorm_1.getConnection().close()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should Save, Load and Delete', function () { return __awaiter(void 0, void 0, void 0, function () {
        var saved, loaded, deleted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, powerballTicketNumberRepository.save(testPowerballTicketNumber)];
                case 1:
                    saved = _a.sent();
                    return [4 /*yield*/, powerballTicketNumberRepository.load(testPowerballTicketNumber.ticketId)];
                case 2:
                    loaded = _a.sent();
                    return [4 /*yield*/, powerballTicketNumberRepository.delete(testPowerballTicketNumber.ticketId)];
                case 3:
                    deleted = _a.sent();
                    expect(saved).toEqual(testPowerballTicketNumber);
                    expect(loaded).toEqual([testPowerballTicketNumber]);
                    expect(deleted).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
});
