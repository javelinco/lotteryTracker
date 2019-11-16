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
var addPowerBallTicket_1 = require("./addPowerBallTicket");
var powerballNumbers = [
    {
        number01: 1,
        number02: 2,
        number03: 3,
        number04: 4,
        number05: 5,
        powerNumber: 6
    },
    {
        number01: 7,
        number02: 8,
        number03: 9,
        number04: 10,
        number05: 11,
        powerNumber: 12
    },
    {
        number01: 13,
        number02: 14,
        number03: 15,
        number04: 16,
        number05: 17,
        powerNumber: 18
    },
    {
        number01: 19,
        number02: 20,
        number03: 21,
        number04: 22,
        number05: 23,
        powerNumber: 24
    },
    {
        number01: 25,
        number02: 26,
        number03: 27,
        number04: 28,
        number05: 29,
        powerNumber: 30
    }
];
describe('Add Powerball Ticket', function () {
    it('Add real ticket', function () { return __awaiter(void 0, void 0, void 0, function () {
        var numbers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    numbers = [
                        { number01: 5, number02: 38, number03: 46, number04: 53, number05: 56, powerNumber: 23 },
                        { number01: 7, number02: 20, number03: 41, number04: 49, number05: 66, powerNumber: 22 },
                        { number01: 17, number02: 19, number03: 32, number04: 62, number05: 67, powerNumber: 6 },
                        { number01: 18, number02: 32, number03: 48, number04: 67, number05: 69, powerNumber: 1 },
                        { number01: 4, number02: 9, number03: 57, number04: 58, number05: 68, powerNumber: 5 }
                    ];
                    return [4 /*yield*/, addPowerBallTicket_1.AddPowerballTicket(new Date('11/4/2019'), true, numbers, 5, undefined)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, 10000000);
    it('Should be golden path', function () { return __awaiter(void 0, void 0, void 0, function () {
        var purchaseDate, cost, powerplay, powerballTicketPurchase, expectedDrawingDates;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    purchaseDate = new Date('11/9/2019');
                    cost = 75;
                    powerplay = true;
                    return [4 /*yield*/, addPowerBallTicket_1.AddPowerballTicket(purchaseDate, powerplay, powerballNumbers, 5, undefined)];
                case 1:
                    powerballTicketPurchase = _a.sent();
                    //Check powerball ticket
                    expect(powerballTicketPurchase.ticket.cost).toBe(cost);
                    expect(powerballTicketPurchase.ticket.powerPlay).toBe(powerplay);
                    expect(powerballTicketPurchase.ticket.purchaseDate).toBe(purchaseDate);
                    expect(powerballTicketPurchase.ticket.ticketId).toBeDefined();
                    expect(powerballTicketPurchase.ticket.createDate).toBeDefined();
                    expect(powerballTicketPurchase.ticket.updateDate).toBeDefined();
                    expect(powerballTicketPurchase.ticket.ownerId).toBeUndefined();
                    //Check powerball ticket numbers
                    expect(powerballTicketPurchase.numbers).toEqual(expect.arrayContaining(powerballNumbers.map(function (number) {
                        return expect.objectContaining(number);
                    })));
                    powerballTicketPurchase.numbers.forEach(function (number) {
                        expect(number.ticketId).toBe(powerballTicketPurchase.ticket.ticketId);
                        expect(number.ticketNumberId).toBeDefined();
                        expect(number.createDate).toBe(powerballTicketPurchase.ticket.createDate);
                        expect(number.updateDate).toBe(powerballTicketPurchase.ticket.updateDate);
                    });
                    expectedDrawingDates = [
                        new Date('11/9/2019'),
                        new Date('11/13/2019'),
                        new Date('11/16/2019'),
                        new Date('11/20/2019'),
                        new Date('11/23/2019')
                    ];
                    expect(powerballTicketPurchase.drawings.map(function (drawing) {
                        return drawing.drawingDate;
                    })).toEqual(expectedDrawingDates);
                    powerballTicketPurchase.drawings.forEach(function (drawing) {
                        expect(drawing.ticketId).toBe(powerballTicketPurchase.ticket.ticketId);
                        expect(drawing.createDate).toBe(powerballTicketPurchase.ticket.createDate);
                        expect(drawing.updateDate).toBe(powerballTicketPurchase.ticket.updateDate);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
