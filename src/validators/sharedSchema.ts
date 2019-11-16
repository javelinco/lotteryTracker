import Joi = require("@hapi/joi");

export const uuidValidator = Joi.string()
    .pattern(new RegExp('[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}'));

export const powerballNumberRange = Joi.number()
    .min(1).max(69);

export const powerballPowerNumberRange = Joi.number()
    .min(1).max(26);