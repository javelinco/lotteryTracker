import Joi = require('@hapi/joi');
import { uuidValidator } from './sharedSchema';
import { powerballTicket } from '../interfaces/powerballTicket';

export class powerballDrawingValidor {
  public async validate(powerballTicket: powerballTicket): Promise<Joi.ValidationResult> {
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
