/// <reference types="hapi__joi" />
import Joi = require('@hapi/joi');
import { PowerballTicketNumber } from '../interfaces/powerball-ticket-number';
export declare class PowerballTicketNumberValidator {
    static schema: Joi.ObjectSchema<{
        ticketNumberId: unknown;
        ticketId: unknown;
        number01: unknown;
        number02: unknown;
        number03: unknown;
        number04: unknown;
        number05: unknown;
        powerNumber: unknown;
        createDate: unknown;
        updateDate: unknown;
    }>;
    static validate(powerballTicketNumber: PowerballTicketNumber): Promise<Joi.ValidationResult>;
}
