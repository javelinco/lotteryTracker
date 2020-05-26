/// <reference types="hapi__joi" />
import Joi = require('@hapi/joi');
import { PowerballTicket } from '../interfaces/powerball-ticket';
export declare class PowerballDrawingValidator {
    validate(powerballTicket: PowerballTicket): Promise<Joi.ValidationResult>;
}
