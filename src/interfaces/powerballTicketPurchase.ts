import { powerballTicket } from './powerballTicket';
import { powerballTicketNumber } from './powerballTicketNumber';
import { powerballTicketDrawing } from './powerballTicketDrawing';

export interface powerballTicketPurchase {
  ticket: powerballTicket;
  numbers: Array<powerballTicketNumber>;
  drawings: Array<powerballTicketDrawing>;
}
