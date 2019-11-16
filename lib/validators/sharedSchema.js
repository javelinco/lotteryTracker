"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Joi = require("@hapi/joi");
exports.uuidValidator = Joi.string()
    .pattern(new RegExp('[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}'));
exports.powerballNumberRange = Joi.number()
    .min(1).max(69);
exports.powerballPowerNumberRange = Joi.number()
    .min(1).max(26);
