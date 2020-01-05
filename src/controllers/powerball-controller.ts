import { Controller, controller, post, put, validate, options } from 'hapi-decorators';
import * as Hapi from '@hapi/hapi';
import { powerballTicketPurchase } from '../interfaces/powerballTicketPurchase';
import { OsResponse, HapiRequest } from '../interfaces/hapi-request';
import Joi = require('@hapi/joi');
import { powerballNumberValidator } from '../validators/powerballNumberValidator';
import { AddPowerballTicket } from '../addPowerBallTicket';
import { AddPowerBallDrawing } from '../addPowerBallDrawing';
import { powerballReport } from '../interfaces/powerballReport';

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
            purchaseDate: Joi.date().required().description('Date of ticket purchased. Used to calculate drawing dates.'),
            powerPlay: Joi.boolean().required().description('Whether or not PowerPlay was purchased. Used to calculate winnings when drawings are entered against the ticket.'),
            numbers: Joi.array().items(powerballNumberValidator.schema),
            drawings: Joi.number().required().description('The number of drawings purchased for the ticket. Used to determine, with the purchase date, the drawing dates for the ticket.')
        })
    })
    @post('/ticket')
    public async ticket(request: HapiRequest): Promise<OsResponse<powerballTicketPurchase>> {
        return await AddPowerballTicket(request.payload.purchaseDate, request.payload.powerPlay, request.payload.numbers, request.payload.drawings);
    }

    @options({
        tags: ['api'],
        description: 'Adds a new Powerball drawing'
    })
    @validate({
        payload: Joi.object().keys({
            drawingDate: Joi.date().required().description('Date of drawing. Used to calculate ticket winnings for the drawing.'),
            drawingNumber: powerballNumberValidator.schema,
            multiplier: Joi.number().required().description('The winning multipler. Used to calculate ticket winnings for the drawing.')
        })
    })
    @put('/drawing')
    public async drawing(request: HapiRequest): Promise<OsResponse<powerballReport>> {
        return await AddPowerBallDrawing(request.payload.drawingDate, request.payload.drawingNumber, request.payload.multiplier, 5000000);
    }
}