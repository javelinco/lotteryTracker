import Joi = require('@hapi/joi');
import { ownerWinning } from '../interfaces/ownerWinning';
import { uuidValidator } from './sharedSchema';

export class ownerWinningValidor {
  public async validate(ownerWinning: ownerWinning): Promise<Joi.ValidationResult> {
    const schema = Joi.object({
      ticketId: uuidValidator.required(),
      drawingDate: Joi.date().required(),
      amount: Joi.number().required(),
      createDate: Joi.date().required(),
      updateDate: Joi.date().required()
    });

    return schema.validate(ownerWinning);
  }
}
