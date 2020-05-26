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
var typeorm_1 = require("typeorm");
var moment = require("moment");
var date_format_1 = require("../helpers/date-format");
var PowerballDrawingEntity = /** @class */ (function () {
    function PowerballDrawingEntity() {
    }
    __decorate([
        typeorm_1.PrimaryColumn('timestamp', { name: 'drawingdate' }),
        __metadata("design:type", Date)
    ], PowerballDrawingEntity.prototype, "drawingDate", void 0);
    __decorate([
        typeorm_1.Column({ name: 'number01' }),
        __metadata("design:type", Number)
    ], PowerballDrawingEntity.prototype, "number01", void 0);
    __decorate([
        typeorm_1.Column({ name: 'number02' }),
        __metadata("design:type", Number)
    ], PowerballDrawingEntity.prototype, "number02", void 0);
    __decorate([
        typeorm_1.Column({ name: 'number03' }),
        __metadata("design:type", Number)
    ], PowerballDrawingEntity.prototype, "number03", void 0);
    __decorate([
        typeorm_1.Column({ name: 'number04' }),
        __metadata("design:type", Number)
    ], PowerballDrawingEntity.prototype, "number04", void 0);
    __decorate([
        typeorm_1.Column({ name: 'number05' }),
        __metadata("design:type", Number)
    ], PowerballDrawingEntity.prototype, "number05", void 0);
    __decorate([
        typeorm_1.Column({ name: 'powernumber' }),
        __metadata("design:type", Number)
    ], PowerballDrawingEntity.prototype, "powerNumber", void 0);
    __decorate([
        typeorm_1.Column({ name: 'multiplier' }),
        __metadata("design:type", Number)
    ], PowerballDrawingEntity.prototype, "multiplier", void 0);
    __decorate([
        typeorm_1.Column('timestamp', { name: 'createdate' }),
        __metadata("design:type", Date)
    ], PowerballDrawingEntity.prototype, "createDate", void 0);
    __decorate([
        typeorm_1.Column('timestamp', { name: 'updatedate' }),
        __metadata("design:type", Date)
    ], PowerballDrawingEntity.prototype, "updateDate", void 0);
    PowerballDrawingEntity = __decorate([
        typeorm_1.Entity({ name: 'powerballdrawing' })
    ], PowerballDrawingEntity);
    return PowerballDrawingEntity;
}());
exports.PowerballDrawingEntity = PowerballDrawingEntity;
var PowerballDrawingRepository = /** @class */ (function () {
    function PowerballDrawingRepository() {
    }
    PowerballDrawingRepository.prototype.delete = function (drawingDate) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getConnection()
                            .createQueryBuilder()
                            .delete()
                            .from(PowerballDrawingEntity)
                            .where('drawingDate = :drawingDate', { drawingDate: drawingDate })
                            .execute()];
                    case 1:
                        deleteResult = _a.sent();
                        return [2 /*return*/, deleteResult.affected !== undefined && deleteResult.affected !== null && deleteResult.affected > 0];
                }
            });
        });
    };
    PowerballDrawingRepository.prototype.getLatest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var powerballDrawingRepository, powerballDrawing;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        powerballDrawingRepository = typeorm_1.getConnection().getRepository(PowerballDrawingEntity);
                        return [4 /*yield*/, powerballDrawingRepository
                                .createQueryBuilder()
                                .orderBy('drawingdate', 'DESC')
                                .getOne()];
                    case 1:
                        powerballDrawing = _a.sent();
                        return [2 /*return*/, powerballDrawing !== undefined ? powerballDrawing : null];
                }
            });
        });
    };
    PowerballDrawingRepository.prototype.load = function (drawingDate) {
        return __awaiter(this, void 0, void 0, function () {
            var powerballDrawingRepository, powerballDrawing;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        powerballDrawingRepository = typeorm_1.getConnection().getRepository(PowerballDrawingEntity);
                        return [4 /*yield*/, powerballDrawingRepository.findOne({
                                where: "drawingDate = '" + moment(drawingDate).format(date_format_1.dateTimeFormat) + "'"
                            })];
                    case 1:
                        powerballDrawing = _a.sent();
                        return [2 /*return*/, powerballDrawing !== undefined ? powerballDrawing : null];
                }
            });
        });
    };
    PowerballDrawingRepository.prototype.save = function (powerballDrawing) {
        return __awaiter(this, void 0, void 0, function () {
            var powerballDrawingRepository, savedEntity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        powerballDrawingRepository = typeorm_1.getConnection().getRepository(PowerballDrawingEntity);
                        return [4 /*yield*/, powerballDrawingRepository.save(powerballDrawing)];
                    case 1:
                        savedEntity = _a.sent();
                        return [2 /*return*/, savedEntity !== undefined ? savedEntity : null];
                }
            });
        });
    };
    return PowerballDrawingRepository;
}());
exports.PowerballDrawingRepository = PowerballDrawingRepository;
