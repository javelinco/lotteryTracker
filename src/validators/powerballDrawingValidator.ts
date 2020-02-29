import Joi = require('@hapi/joi');
import { powerballPowerNumberRange, powerballNumberRange } from './sharedSchema';
import { powerballDrawing } from '../interfaces/powerballDrawing';

export class powerballDrawingValidor {
  public async validate(powerballDrawing: powerballDrawing): Promise<Joi.ValidationResult> {
    const schema = Joi.object({
      drawingDate: Joi.date().required(),
      number01: powerballNumberRange.required(),
      number02: powerballNumberRange.required(),
      number03: powerballNumberRange.required(),
      number04: powerballNumberRange.required(),
      number05: powerballNumberRange.required(),
      powerNumber: powerballPowerNumberRange.required(),
      createDate: Joi.date().required(),
      updateDate: Joi.date().required()
    });

    return schema.validate(powerballDrawing);
  }
}
