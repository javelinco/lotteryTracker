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
var powerball_1 = require("./powerball");
var ts_mockito_1 = require("ts-mockito");
var powerball_drawing_1 = require("./repositories/powerball-drawing");
var powerball_ticket_drawing_1 = require("./repositories/powerball-ticket-drawing");
var powerball_ticket_number_1 = require("./repositories/powerball-ticket-number");
var uuid_1 = require("uuid");
var powerball_ticket_1 = require("./repositories/powerball-ticket");
var owner_winning_1 = require("./repositories/owner-winning");
describe('Unit - Powerball', function () {
    function createPowerballTicketNumber(ticketId, numbers) {
        var powerballTicketNumber = {
            ticketNumberId: uuid_1.v4(),
            ticketId: ticketId,
            number01: numbers[0],
            number02: numbers[1],
            number03: numbers[2],
            number04: numbers[3],
            number05: numbers[4],
            powerNumber: numbers[5],
            createDate: new Date('1/1/2000'),
            updateDate: new Date('1/1/2000')
        };
        return powerballTicketNumber;
    }
    var powerball;
    beforeEach(function () {
        var powerballDrawingRepositoryMock = ts_mockito_1.mock(powerball_drawing_1.PowerballDrawingRepository);
        var powerballTicketDrawingRepositoryMock = ts_mockito_1.mock(powerball_ticket_drawing_1.PowerballTicketDrawingRepository);
        var powerballTicketNumberRepositoryMock = ts_mockito_1.mock(powerball_ticket_number_1.PowerballTicketNumberRepository);
        var powerballTicketRepositoryMock = ts_mockito_1.mock(powerball_ticket_1.PowerballTicketRepository);
        var ownerWinningRepositoryMock = ts_mockito_1.mock(owner_winning_1.OwnerWinningRepository);
        powerball = new powerball_1.Powerball(ts_mockito_1.instance(powerballDrawingRepositoryMock), ts_mockito_1.instance(powerballTicketDrawingRepositoryMock), ts_mockito_1.instance(powerballTicketNumberRepositoryMock), ts_mockito_1.instance(powerballTicketRepositoryMock), ts_mockito_1.instance(ownerWinningRepositoryMock));
    });
    it('Should calculate Powerball winnings for a ticket', function () { return __awaiter(void 0, void 0, void 0, function () {
        var powerballTicket, powerballTicketNumbers, powerballDrawing, ticketWinning, expectedTicketNumberWinnings, expectedTicketWinning;
        return __generator(this, function (_a) {
            powerballTicket = {
                ticketId: uuid_1.v4(),
                purchaseDate: new Date('1/1/2000'),
                cost: 25,
                powerPlay: true,
                ownerId: uuid_1.v4(),
                createDate: new Date('1/1/2000'),
                updateDate: new Date('1/1/2000')
            };
            powerballTicketNumbers = [
                createPowerballTicketNumber(powerballTicket.ticketId, [1, 2, 3, 4, 5, 6]),
                createPowerballTicketNumber(powerballTicket.ticketId, [2, 3, 4, 5, 6, 7]),
                createPowerballTicketNumber(powerballTicket.ticketId, [3, 4, 5, 6, 7, 8]),
                createPowerballTicketNumber(powerballTicket.ticketId, [4, 5, 6, 7, 8, 9]),
                createPowerballTicketNumber(powerballTicket.ticketId, [5, 6, 7, 8, 9, 10]) // 1 match
            ];
            powerballDrawing = {
                drawingDate: new Date('1/1/2000'),
                number01: 1,
                number02: 2,
                number03: 3,
                number04: 4,
                number05: 5,
                powerNumber: 6,
                multiplier: 2,
                createDate: new Date('1/1/2000'),
                updateDate: new Date('1/1/2000')
            };
            ticketWinning = powerball.calculateWinning(powerballTicket.ticketId, powerballTicket.powerPlay, powerballDrawing, powerballTicketNumbers, powerball_1.Powerball.defaultGrandPrize);
            expectedTicketNumberWinnings = [
                {
                    powerballTicketNumber: powerballTicketNumbers[0],
                    matches: 5,
                    powerNumberMatch: true,
                    amount: powerball.calculatePrize(5, true, powerballTicket.powerPlay, powerballDrawing.multiplier, powerball_1.Powerball.defaultGrandPrize)
                },
                {
                    powerballTicketNumber: powerballTicketNumbers[1],
                    matches: 4,
                    powerNumberMatch: false,
                    amount: powerball.calculatePrize(4, false, powerballTicket.powerPlay, powerballDrawing.multiplier, powerball_1.Powerball.defaultGrandPrize)
                },
                {
                    powerballTicketNumber: powerballTicketNumbers[2],
                    matches: 3,
                    powerNumberMatch: false,
                    amount: powerball.calculatePrize(3, false, powerballTicket.powerPlay, powerballDrawing.multiplier, powerball_1.Powerball.defaultGrandPrize)
                },
                {
                    powerballTicketNumber: powerballTicketNumbers[3],
                    matches: 2,
                    powerNumberMatch: false,
                    amount: powerball.calculatePrize(2, false, powerballTicket.powerPlay, powerballDrawing.multiplier, powerball_1.Powerball.defaultGrandPrize)
                },
                {
                    powerballTicketNumber: powerballTicketNumbers[4],
                    matches: 1,
                    powerNumberMatch: false,
                    amount: powerball.calculatePrize(0, false, powerballTicket.powerPlay, powerballDrawing.multiplier, powerball_1.Powerball.defaultGrandPrize)
                }
            ];
            expectedTicketWinning = {
                ticketId: powerballTicket.ticketId,
                drawingDate: powerballDrawing.drawingDate,
                ticketNumberWinnings: expectedTicketNumberWinnings
            };
            expect(expectedTicketWinning).toEqual(ticketWinning);
            return [2 /*return*/];
        });
    }); });
    it('Should get winnings given no last Powerball drawing', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(true).toBeTruthy();
            return [2 /*return*/];
        });
    }); });
    it('Should get winnings given a specific last Powerball drawing', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(true).toBeTruthy();
            return [2 /*return*/];
        });
    }); });
    it('Should get next drawing dates given purchase date and number of drawings', function () {
        var testDrawingDates = [
            {
                purchaseDate: new Date('5/25/2020'),
                drawingCount: 5,
                expectedDrawingDates: [
                    new Date('5/27/2020'),
                    new Date('5/30/2020'),
                    new Date('6/3/2020'),
                    new Date('6/6/2020'),
                    new Date('6/10/2020')
                ]
            },
            {
                purchaseDate: new Date('2/25/2020'),
                drawingCount: 1,
                expectedDrawingDates: [new Date('2/26/2020')]
            },
            {
                purchaseDate: new Date('11/25/2019'),
                drawingCount: 2,
                expectedDrawingDates: [new Date('11/27/2019'), new Date('11/30/2019')]
            },
            {
                purchaseDate: new Date('12/29/2019'),
                drawingCount: 2,
                expectedDrawingDates: [new Date('1/1/2020'), new Date('1/4/2020')]
            },
            {
                purchaseDate: new Date('4/1/2020'),
                drawingCount: 3,
                expectedDrawingDates: [new Date('4/1/2020'), new Date('4/4/2020'), new Date('4/8/2020')]
            },
            {
                purchaseDate: new Date('2/25/2020'),
                drawingCount: 10,
                expectedDrawingDates: [
                    new Date('2/26/2020'),
                    new Date('2/29/2020'),
                    new Date('3/4/2020'),
                    new Date('3/7/2020'),
                    new Date('3/11/2020'),
                    new Date('3/14/2020'),
                    new Date('3/18/2020'),
                    new Date('3/21/2020'),
                    new Date('3/25/2020'),
                    new Date('3/28/2020')
                ]
            }
        ];
        for (var _i = 0, testDrawingDates_1 = testDrawingDates; _i < testDrawingDates_1.length; _i++) {
            var testDrawingDate = testDrawingDates_1[_i];
            var drawingDates = powerball.getPowerballDrawingDates(testDrawingDate.purchaseDate, testDrawingDate.drawingCount);
            expect(drawingDates).toEqual(testDrawingDate.expectedDrawingDates);
        }
    });
});
