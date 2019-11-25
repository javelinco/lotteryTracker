import { powerballNumber } from "./powerballNumber";

export interface powerballReport {
    drawingNumber: powerballNumber,
    ticketWinningReports: Array<ticketWinningReport>,
    lotteryReturnOnInvestment: number
}

export interface ticketWinningReport {
    ticketId: string,
    numbers: Array<powerballReportNumber>,
    drawingWinningAmount: number,
    ticketWinningAmount: number
}

export interface powerballReportNumber extends powerballNumber  {
    matchCount: number,
    powerballMatch: boolean
}

/*
async function getDrawingNumbers(drawingDate: Date): Promise<Array<drawingNumber>> {
    const firstTicketId: string = uuid();
    const drawingNumbers: Array<drawingNumber> = [
        {
            ticketId: firstTicketId,
            number01: 7,
            number02: 8,
            number03: 9,
            number04: 10,
            number05: 11,
            powerNumber: 6,
            powerPlay: true
        },
        {
            ticketId: uuid(),
            number01: 12,
            number02: 13,
            number03: 14,
            number04: 15,
            number05: 16,
            powerNumber: 17,
            powerPlay: true
        },
        {
            ticketId: uuid(),
            number01: 18,
            number02: 19,
            number03: 20,
            number04: 21,
            number05: 22,
            powerNumber: 23,
            powerPlay: false
        },
        {
            ticketId: firstTicketId,
            number01: 24,
            number02: 25,
            number03: 26,
            number04: 27,
            number05: 28,
            powerNumber: 29,
            powerPlay: true
        },
    ];

    return drawingNumbers;
}
*/