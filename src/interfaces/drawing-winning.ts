import { PowerballTicketNumber } from './powerball-ticket-number';

export interface DrawingWinning {
  drawingDate: Date;
  ticketWinnings: Array<TicketWinning>;
}
export interface TicketWinning {
  ticketId: string;
  drawingDate: Date;
  ticketNumberWinnings: Array<TicketNumberWinning>;
}
export interface TicketNumberWinning {
  powerballTicketNumber: PowerballTicketNumber;
  matches: number;
  powerNumberMatch: boolean;
  amount: number;
}
