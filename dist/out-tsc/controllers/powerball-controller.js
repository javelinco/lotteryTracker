"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var hapi_decorators_1 = require("hapi-decorators");
var Joi = require("@hapi/joi");
var powerball_number_1 = require("../validators/powerball-number");
var powerball_1 = require("../powerball");
var PowerballController = /** @class */ (function () {
    function PowerballController() {
    }
    PowerballController.prototype.getTicketsByDrawingDate = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new powerball_1.Powerball().getPowerballReportsByDrawingDate(new Date(request.params.drawingDate))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PowerballController.prototype.ticket = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new powerball_1.Powerball().addTicket(request.payload.purchaseDate, request.payload.powerPlay, request.payload.numbers, request.payload.drawings)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PowerballController.prototype.newWinnings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new powerball_1.Powerball().getWinningsSinceLastDrawing()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    __decorate([
        hapi_decorators_1.options({
            tags: ['api'],
            description: 'Gets all tickets that have a drawing for the supplied date'
        }),
        hapi_decorators_1.validate({
            params: Joi.object().keys({
                drawingDate: Joi.date()
                    .required()
                    .description('Date of Powerball drawing')
            })
        }),
        hapi_decorators_1.get('/v1/powerball/ticket/{drawingDate}'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], PowerballController.prototype, "getTicketsByDrawingDate", null);
    __decorate([
        hapi_decorators_1.options({
            tags: ['api'],
            description: 'Adds a new Powerball ticket'
        }),
        hapi_decorators_1.validate({
            payload: Joi.object().keys({
                purchaseDate: Joi.date()
                    .required()
                    .description('Date of ticket purchased. Used to calculate drawing dates.'),
                powerPlay: Joi.boolean()
                    .required()
                    .description('Whether or not PowerPlay was purchased. Used to calculate winnings when drawings are entered against the ticket.'),
                numbers: Joi.array().items(powerball_number_1.PowerballNumberValidator.schema),
                drawings: Joi.number()
                    .required()
                    .description('The number of drawings purchased for the ticket. Used to determine, with the purchase date, the drawing dates for the ticket.')
            })
        }),
        hapi_decorators_1.post('/v1/powerball/ticket'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], PowerballController.prototype, "ticket", null);
    __decorate([
        hapi_decorators_1.options({
            tags: ['api'],
            description: 'Checks for new Powerball winnings'
        }),
        hapi_decorators_1.put('/v1/powerball/drawing/winnings'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], PowerballController.prototype, "newWinnings", null);
    PowerballController = __decorate([
        hapi_decorators_1.controller('')
    ], PowerballController);
    return PowerballController;
}());
exports.PowerballController = PowerballController;
