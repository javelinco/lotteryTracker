import Joi = require('@hapi/joi');
import { powerballNumber } from '../interfaces/powerballNumber';
import { powerballNumberRange, powerballPowerNumberRange } from './sharedSchema';

export class powerballNumberValidator {
  static schema = Joi.object({
    number01: powerballNumberRange.required(),
    number02: powerballNumberRange.required(),
    number03: powerballNumberRange.required(),
    number04: powerballNumberRange.required(),
    number05: powerballNumberRange.required(),
    powerNumber: powerballPowerNumberRange.required()
  });

  public static async validate(powerballNumber: powerballNumber): Promise<Joi.ValidationResult> {
    return this.schema.validate(powerballNumber);
  }
}
