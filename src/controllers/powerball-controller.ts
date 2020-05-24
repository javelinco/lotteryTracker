import { Controller, controller, post, put, validate, options } from 'hapi-decorators';
import * as Hapi from '@hapi/hapi';
import { PowerballTicketPurchase } from '../interfaces/powerball-ticket-purchase';
import { OsResponse, HapiRequest } from '../interfaces/hapi-request';
import Joi = require('@hapi/joi');
import { PowerballNumberValidator } from '../validators/powerball-number';
import { addPowerballTicket } from '../add-powerball-ticket';
import { Powerball, DrawingWinning } from '../Powerball';

@controller('/v1/powerball')
export class PowerballController implements Controller {
  public baseUrl!: string;
  public routes!: () => Array<Hapi.ServerRoute>;

  @options({
    tags: ['api'],
    description: 'Adds a new Powerball ticket'
  })
  @validate({
    payload: Joi.object().keys({
      purchaseDate: Joi.date()
        .required()
        .description('Date of ticket purchased. Used to calculate drawing dates.'),
      powerPlay: Joi.boolean()
        .required()
        .description('Whether or not PowerPlay was purchased. Used to calculate winnings when drawings are entered against the ticket.'),
      numbers: Joi.array().items(PowerballNumberValidator.schema),
      drawings: Joi.number()
        .required()
        .description(
          'The number of drawings purchased for the ticket. Used to determine, with the purchase date, the drawing dates for the ticket.'
        )
    })
  })
  @post('/ticket')
  public async ticket(request: HapiRequest): Promise<OsResponse<PowerballTicketPurchase>> {
    return await addPowerballTicket(
      request.payload.purchaseDate,
      request.payload.powerPlay,
      request.payload.numbers,
      request.payload.drawings
    );
  }

  @options({
    tags: ['api'],
    description: 'Checks for new Powerball winnings'
  })
  @put('/drawing/winnings')
  public async newWinnings(): Promise<OsResponse<Array<DrawingWinning>>> {
    return await new Powerball().getWinningsSinceLastDrawing();
  }
}
