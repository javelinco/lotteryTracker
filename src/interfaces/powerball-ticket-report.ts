import { PowerballTicket } from './powerball-ticket';
import { PowerballTicketNumber } from './powerball-ticket-number';
import { PowerballTicketDrawing } from './powerball-ticket-drawing';
import { OwnerWinning } from './owner-winning';

export interface PowerballTicketReport {
  ticket: PowerballTicket;
  numbers: Array<PowerballTicketNumber>;
  drawings: Array<PowerballTicketDrawing>;
  winnings: Array<OwnerWinning>;
}
