import Joi = require('@hapi/joi');
import { uuidValidator } from './shared-schema';
import { PowerballTicket } from '../interfaces/powerball-ticket';

export class PowerballDrawingValidator {
  public async validate(powerballTicket: PowerballTicket): Promise<Joi.ValidationResult> {
    const schema = Joi.object({
      ticketId: uuidValidator.required(),
      purchaseDate: Joi.date().required(),
      cost: Joi.number().required(),
      powerPlay: Joi.boolean().required(),
      ownerId: uuidValidator,
      createDate: Joi.date().required(),
      updateDate: Joi.date().required()
    });

    return schema.validate(powerballTicket);
  }
}
