import { powerballNumber } from "./powerballNumber";

export interface PowerballReport {
    numbers: Array<PowerballReportNumber>,
    drawingWinningAmount: number,
    ticketWinningAmount: number,
    lotteryReturnOnInvestment: number
}

export interface PowerballReportNumber extends powerballNumber  {
    matchCount: number,
    powerballMatch: boolean
}