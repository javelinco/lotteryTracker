import { PowerballTicket } from './powerball-ticket';
import { PowerballTicketNumber } from './powerball-ticket-number';
import { PowerballTicketDrawing } from './powerball-ticket-drawing';

export interface PowerballTicketPurchase {
  ticket: PowerballTicket;
  numbers: Array<PowerballTicketNumber>;
  drawings: Array<PowerballTicketDrawing>;
}
