import Joi = require('@hapi/joi');
import { uuidValidator, powerballNumberRange, powerballPowerNumberRange } from './shared-schema';
import { PowerballTicketNumber } from '../interfaces/powerball-ticket-number';

export class PowerballTicketNumberValidator {
  public static schema = Joi.object({
    ticketNumberId: uuidValidator.required(),
    ticketId: uuidValidator.required(),
    number01: powerballNumberRange.required(),
    number02: powerballNumberRange.required(),
    number03: powerballNumberRange.required(),
    number04: powerballNumberRange.required(),
    number05: powerballNumberRange.required(),
    powerNumber: powerballPowerNumberRange.required(),
    createDate: Joi.date().required(),
    updateDate: Joi.date().required()
  });

  public static async validate(powerballTicketNumber: PowerballTicketNumber): Promise<Joi.ValidationResult> {
    return this.schema.validate(powerballTicketNumber);
  }
}
