import Joi = require('@hapi/joi');
import { drawingNumber } from '../interfaces/drawingNumber';
import { uuidValidator, powerballNumberRange, powerballPowerNumberRange } from './sharedSchema';

export class drawingNumberValidor {
  public async validate(drawingNumber: drawingNumber): Promise<Joi.ValidationResult> {
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
