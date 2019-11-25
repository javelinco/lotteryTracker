import { AddPowerBallDrawing } from "./addPowerBallDrawing";
import { drawingNumber } from "./interfaces/drawingNumber";
import { powerballNumber } from "./interfaces/powerballNumber";
import uuid = require("uuid");
import { powerballReport, ticketWinningReport, powerballReportNumber } from "./interfaces/powerballReport";

let expectedTicketWinnings: Array<{ticketId: string, winnings: number, matchCount: number, powerballMatch: boolean}> = [];
let expectedLotteryReturnOnInvestment: number = 0;
let ticketIds: Array<string> = [];
let drawingNumbers: Array<drawingNumber> = [];
let drawingNumber: powerballNumber;

async function getDrawingNumbers(drawingDate: Date): Promise<Array<drawingNumber>> {
    return drawingNumbers;
}

async function getTicketWinnings(ticketId: string): Promise<number> {
    return expectedTicketWinnings.filter(ticket => ticket.ticketId === ticketId)[0].winnings;
}

async function getLotteryReturnOnInvestment(): Promise<number> {
    return expectedLotteryReturnOnInvestment;
}

describe('Add Powerball Drawing', () => {
    beforeAll(() => {
        ticketIds = [ uuid(), uuid(), uuid() ];
        
        drawingNumbers = [
            {
                ticketId: ticketIds[0],
                number01: 1,
                number02: 8,
                number03: 9,
                number04: 10,
                number05: 11,
                powerNumber: 6,
                powerPlay: true
            },
            {
                ticketId: ticketIds[1],
                number01: 12,
                number02: 13,
                number03: 14,
                number04: 15,
                number05: 16,
                powerNumber: 17,
                powerPlay: true
            },
            {
                ticketId: ticketIds[2],
                number01: 18,
                number02: 19,
                number03: 20,
                number04: 21,
                number05: 22,
                powerNumber: 23,
                powerPlay: false
            },
            {
                ticketId: ticketIds[0],
                number01: 24,
                number02: 25,
                number03: 26,
                number04: 27,
                number05: 28,
                powerNumber: 29,
                powerPlay: true
            },
        ];
        drawingNumber = {
            number01: 1,
            number02: 2,
            number03: 3,
            number04: 4,
            number05: 5,
            powerNumber: 6
        };
        expectedTicketWinnings = [
            { ticketId: ticketIds[0], winnings: 8, matchCount: 1, powerballMatch: true },
            { ticketId: ticketIds[1], winnings: 0, matchCount: 0, powerballMatch: false },
            { ticketId: ticketIds[2], winnings: 0, matchCount: 0, powerballMatch: false }
        ];
        expectedLotteryReturnOnInvestment = -75
            + expectedTicketWinnings.reduce((sum, winning) => sum + winning.winnings, 0);
    });

    it('Should record real drawing', async () => {
        const drawingDate = new Date('11/6/2019');
        const number: powerballNumber = {
            number01: 1,
            number02: 2,
            number03: 3,
            number04: 4,
            number05: 5,
            powerNumber: 6
        };
        const multiplier = 2;
        const grandPrizeAmount = 0;
        const powerballReport: powerballReport = await AddPowerBallDrawing(
            drawingDate,
            number,
            multiplier,
            grandPrizeAmount,
            getDrawingNumbers,
            getTicketWinnings,
            getLotteryReturnOnInvestment,
            null,
            null
        );

        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });

        let reportOutput: string = 'PowerballReport: \n';
        powerballReport.ticketWinningReports.map(report => {
            reportOutput = `${reportOutput}TicketId: ${report.ticketId}\n`;
            report.numbers.map(number => {
                reportOutput = `${reportOutput}Set {${number.number01}, ${number.number02}, ${number.number03}, ${number.number04}, ${number.number05}, ${number.powerNumber}} : ${number.matchCount} matches, ${number.powerballMatch ? '' : 'no'} powerball\n`;
            });
            reportOutput = `${reportOutput}Drawing Winnings: ${formatter.format(report.drawingWinningAmount)}\n`;
            reportOutput = `${reportOutput}Ticket Winnings: ${formatter.format(report.ticketWinningAmount)}\n`;
        });
        reportOutput = `${reportOutput}Lottery ROI: ${formatter.format(powerballReport.lotteryReturnOnInvestment)}`;
        console.log(reportOutput);
    });

    it('Should report single win with PowerNumber match only', async () => {
        const drawingDate = new Date('11/16/2019');
        const multiplier = 2;
        const grandPrizeAmount = 100000000;
        const powerballReport: powerballReport = await AddPowerBallDrawing(
            drawingDate,
            drawingNumber,
            multiplier,
            grandPrizeAmount,
            getDrawingNumbers,
            getTicketWinnings,
            getLotteryReturnOnInvestment,
            null,
            null
        );
    
        expect(powerballReport).toBeTruthy();
        expect(powerballReport.drawingNumber).toBe(drawingNumber);
        expect(powerballReport.lotteryReturnOnInvestment).toBe(expectedLotteryReturnOnInvestment);
        expect(powerballReport.ticketWinningReports.length).toBe(ticketIds.length);
        ticketIds.map((ticketId: string) => {
            const ticketWinningReports: Array<ticketWinningReport> = powerballReport.ticketWinningReports
                .filter(report => report.ticketId === ticketId);
            const expectedTicketWinning = expectedTicketWinnings.filter(ticket => ticket.ticketId === ticketId)[0];
            expect(ticketWinningReports.length).toBe(1);
            expect(ticketWinningReports[0].drawingWinningAmount)
                .toBe(expectedTicketWinning.winnings);
            expect(ticketWinningReports[0].numbers.length)
                .toBe(drawingNumbers.filter(number => number.ticketId == ticketId).length);
            ticketWinningReports[0].numbers.map((number: powerballReportNumber) => {
                if (number.number01 === 24) {
                    expect(number.matchCount).toBe(0); 
                    expect(number.powerballMatch).toBe(false);
                } else {
                    expect(number.matchCount).toBe(expectedTicketWinning.matchCount); 
                    expect(number.powerballMatch).toBe(expectedTicketWinning.powerballMatch);
                }
            });
        });
    });
});