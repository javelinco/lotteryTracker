import Joi = require('@hapi/joi');
import { OwnerWinning } from '../interfaces/owner-winning';
import { uuidValidator } from './shared-schema';

export class OwnerWinningValidator {
  public async validate(ownerWinning: OwnerWinning): Promise<Joi.ValidationResult> {
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
