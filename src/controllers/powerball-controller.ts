import { Controller, controller, post, put, get, validate, options } from 'hapi-decorators';
import * as Hapi from '@hapi/hapi';
import { OsResponse, HapiRequest } from '../interfaces/hapi-request';
import Joi = require('@hapi/joi');
import { PowerballNumberValidator } from '../validators/powerball-number';
import { Powerball } from '../powerball';
import { DrawingWinning } from '../interfaces/drawing-winning';
import { PowerballTicketReport } from '../interfaces/powerball-ticket-report';

@controller('')
export class PowerballController implements Controller {
  public baseUrl!: string;
  public routes!: () => Array<Hapi.ServerRoute>;

  @options({
    tags: ['api'],
    description: 'Gets all tickets that have a drawing for the supplied date'
  })
  @validate({
    params: Joi.object().keys({
      drawingDate: Joi.date()
        .required()
        .description('Date of Powerball drawing')
    })
  })
  @get('/v1/powerball/ticket/{drawingDate}')
  public async getTicketsByDrawingDate(request: HapiRequest): Promise<OsResponse<Array<PowerballTicketReport>>> {
    return await new Powerball().getPowerballReportsByDrawingDate(new Date(request.params.drawingDate));
  }

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
  @post('/v1/powerball/ticket')
  public async ticket(request: HapiRequest): Promise<OsResponse<PowerballTicketReport>> {
    return await new Powerball().addTicket(
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
  @put('/v1/powerball/drawing/winnings')
  public async newWinnings(): Promise<OsResponse<Array<DrawingWinning>>> {
    return await new Powerball().getWinningsSinceLastDrawing();
  }
}
