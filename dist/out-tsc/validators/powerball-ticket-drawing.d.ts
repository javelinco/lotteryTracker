/// <reference types="hapi__joi" />
import Joi = require('@hapi/joi');
import { PowerballTicketDrawing } from '../interfaces/powerball-ticket-drawing';
export declare class PowerballTicketPurchaseValidator {
    validate(powerballTicketDrawing: PowerballTicketDrawing): Promise<Joi.ValidationResult>;
}
