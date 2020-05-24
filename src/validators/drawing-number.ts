import Joi = require('@hapi/joi');
import { DrawingNumber } from '../interfaces/drawing-number';
import { uuidValidator, powerballNumberRange, powerballPowerNumberRange } from './shared-schema';

export class DrawingNumberValidator {
  public async validate(drawingNumber: DrawingNumber): Promise<Joi.ValidationResult> {
    const schema = Joi.object({
      ticketId: uuidValidator.required(),
      number01: powerballNumberRange.required(),
      number02: powerballNumberRange.required(),
      number03: powerballNumberRange.required(),
      number04: powerballNumberRange.required(),
      number05: powerballNumberRange.required(),
      powerNumber: powerballPowerNumberRange.required(),
      powerPlay: Joi.boolean().required()
    });

    return schema.validate(drawingNumber);
  }
}
