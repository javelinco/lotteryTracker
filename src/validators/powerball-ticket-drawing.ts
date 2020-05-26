import Joi = require('@hapi/joi');
import { uuidValidator } from './shared-schema';
import { PowerballTicketDrawing } from '../interfaces/powerball-ticket-drawing';

export class PowerballTicketPurchaseValidator {
  public async validate(powerballTicketDrawing: PowerballTicketDrawing): Promise<Joi.ValidationResult> {
    const schema = Joi.object({
      ticketId: uuidValidator.required(),
      drawingDate: Joi.date().required(),
      createDate: Joi.date().required(),
      updateDate: Joi.date().required()
    });

    return schema.validate(powerballTicketDrawing);
  }
}
