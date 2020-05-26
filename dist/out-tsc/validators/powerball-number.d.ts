/// <reference types="hapi__joi" />
import Joi = require('@hapi/joi');
import { PowerballNumber } from '../interfaces/powerball-number';
export declare class PowerballNumberValidator {
    static schema: Joi.ObjectSchema<{
        number01: unknown;
        number02: unknown;
        number03: unknown;
        number04: unknown;
        number05: unknown;
        powerNumber: unknown;
    }>;
    static validate(powerballNumber: PowerballNumber): Promise<Joi.ValidationResult>;
}
