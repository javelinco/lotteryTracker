import Joi = require('@hapi/joi');
import { PowerballNumber } from '../interfaces/powerball-number';
import { powerballNumberRange, powerballPowerNumberRange } from './shared-schema';

export class PowerballNumberValidator {
  public static schema = Joi.object({
    number01: powerballNumberRange.required(),
    number02: powerballNumberRange.required(),
    number03: powerballNumberRange.required(),
    number04: powerballNumberRange.required(),
    number05: powerballNumberRange.required(),
    powerNumber: powerballPowerNumberRange.required()
  });

  public static async validate(powerballNumber: PowerballNumber): Promise<Joi.ValidationResult> {
    return this.schema.validate(powerballNumber);
  }
}
