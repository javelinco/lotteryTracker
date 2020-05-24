import { PowerballNumber } from './powerball-number';

export interface PowerballReport {
  drawingNumber: PowerballNumber;
  ticketWinningReports: Array<TicketWinningReport>;
  lotteryReturnOnInvestment: number;
}

export interface TicketWinningReport {
  ticketId: string;
  numbers: Array<PowerballReportNumber>;
  drawingWinningAmount: number;
  ticketWinningAmount: number;
}

export interface PowerballReportNumber extends PowerballNumber {
  matchCount: number;
  powerballMatch: boolean;
}
