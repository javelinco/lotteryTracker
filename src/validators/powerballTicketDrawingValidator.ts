import Joi = require('@hapi/joi');
import { uuidValidator } from './sharedSchema';
import { powerballTicketDrawing } from '../interfaces/powerballTicketDrawing';

export class powerballTicketPurchaseValidator {
  public async validate(powerballTicketDrawing: powerballTicketDrawing): Promise<Joi.ValidationResult> {
    const schema = Joi.object({
      ticketId: uuidValidator.required(),
      drawingDate: Joi.date().required(),
      createDate: Joi.date().required(),
      updateDate: Joi.date().required()
    });

    return schema.validate(powerballTicketDrawing);
  }
}
