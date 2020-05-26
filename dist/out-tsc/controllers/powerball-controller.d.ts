import { Controller } from 'hapi-decorators';
import * as Hapi from '@hapi/hapi';
import { OsResponse, HapiRequest } from '../interfaces/hapi-request';
import { DrawingWinning } from '../interfaces/drawing-winning';
import { PowerballTicketReport } from '../interfaces/powerball-ticket-report';
export declare class PowerballController implements Controller {
    baseUrl: string;
    routes: () => Array<Hapi.ServerRoute>;
    getTicketsByDrawingDate(request: HapiRequest): Promise<OsResponse<Array<PowerballTicketReport>>>;
    ticket(request: HapiRequest): Promise<OsResponse<PowerballTicketReport>>;
    newWinnings(): Promise<OsResponse<Array<DrawingWinning>>>;
}
