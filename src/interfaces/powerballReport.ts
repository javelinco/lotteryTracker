import { powerballNumber } from './powerballNumber';

export interface powerballReport {
  drawingNumber: powerballNumber;
  ticketWinningReports: Array<ticketWinningReport>;
  lotteryReturnOnInvestment: number;
}

export interface ticketWinningReport {
  ticketId: string;
  numbers: Array<powerballReportNumber>;
  drawingWinningAmount: number;
  ticketWinningAmount: number;
}

export interface powerballReportNumber extends powerballNumber {
  matchCount: number;
  powerballMatch: boolean;
}
